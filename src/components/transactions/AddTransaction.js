/*
Add a new Transaction form 

Params:

setIsNewTransaction
  -> Used to set the state for css flash/fade effect for newly added transaction
  -> passed down from <Transactions />

loadTransactions
  -> from useTransactions hook. Used to get updated transaction list from DB
*/

// Dependencies
import { Style } from 'react-style-tag'
import { useContext } from 'react'
import { FlashContext, UserContext } from '../../App'

// Utils
import { addTransaction } from '../../model/transactions.model'
import useBudgets from '../../utils/useBudgets'





export default function Base({ setIsNewTransaction, loadTransactions }) {

  // 
  // Get Contexts
  // 
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]

  //
  // Get Budgets
  //
  const { budgets } = useBudgets({ userId : user.id })
  
  //
  // Add Transaction handler
  //
  async function handleAddTransaction(e) {
    e.preventDefault()

    try {

      const res = await addTransaction({
        name : e.target[0].value,
        amount : parseFloat(e.target[1].value),
        budget : e.target[2].value,
        userId : user.id
      })

      if (res.error) throw new Error(res.error)
      loadTransactions({ userId : user.id })

      setIsNewTransaction(res.transaction_id)
      setTimeout( () => { setIsNewTransaction(false) }, 1000)
      
    } catch (error) {

      setFlash({ type : 'fail', message : error.message })
      
    }
  }



  return(
    <>
    <Style>
    {`
      .add-transaction {
        padding : 1rem 0.5rem;
      }


      .add-transaction-form {
        display : flex;
        flex-wrap : wrap;
        align-items : center;
        gap : 1rem;
        margin-block : 1rem;
      }

      input.add-transaction-submit {
        background-color : var(--clr-primary-2);
      }
    `}
    </Style>
    
    <div className='add-transaction'>
      <h2>Add a Transaction</h2>
      <form onSubmit={ handleAddTransaction }>

        <div className="add-transaction-form">
          <label>
            <span className='add-transaction-label'>Name </span>
            <input type="text" name="transactionName" />
          </label>

          <label>
            <span className='add-transaction-label'> Amount </span>
            <input type="number" name="transactionAmount" step="0.01" />
          </label>

          <label>
            <span className='add-transation-label'>Budget </span>
            <select>
              <option value="Uncategorized">--Uncategorized</option>
              {
                budgets.map( budget => {
                  return(
                    <option value={ budget.name } key={budget.name} >{ budget.name }</option>
                  )
                })
              }
            </select>
          </label>

          <div>
            <input type="submit" value="Add transaction" className='add-transaction-submit' />
          </div>
        </div>

        </form>
      </div>
    </>
  )
}