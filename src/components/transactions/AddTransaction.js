import { Style } from 'react-style-tag'
import { useContext } from 'react'
import { FlashContext, UserContext } from '../../App'
import { addTransaction } from '../../model/transactions.model'
import useBudgets from '../../utils/useBudgets'

export default function Base({ setIsNewTransaction }) {

  // Get Context
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]


  const budgets = useBudgets({ userId : user.id }).budgets
  




  // Add Transaction handler
  async function handleAddTransaction(e) {
    e.preventDefault()

    try {

      // Fetch Response
      const res = await addTransaction({
        name : e.target[0].value,
        amount : e.target[1].value,
        budget : e.target[2].value,
        userId : user.id
      })

      // Check/Set user transactions
      if (res.error) throw new Error(res.error)
      // getUserTransactions()

      // Flash New Transaction
      setIsNewTransaction(res.transaction_id)
      setTimeout( () => { setIsNewTransaction(false) }, 1000)
      
    } catch (error) {

      // Flash error message
      setFlash({ type : 'fail', message : error.message })
      
    }
  }



  return(
    <>
    <Style>
    {`
      .add-transaction {
        padding : 1rem 0.5rem;
        border : 1px solid #333;
      }


      .add-transaction-form {
        display : flex;
        flex-wrap : wrap;
        gap : 1rem;
        margin-block : 1rem;
      }
    `}
    </Style>
    
    <div className='add-transaction my2'>
      <h2>Add a Transaction</h2>
      <form onSubmit={ handleAddTransaction }>

        <div className="add-transaction-form">
          <label>
            <span className='add-transaction-label'>Transaction Name </span>
            <input type="text" name="transactionName" />
          </label>

          <label>
            <span className='add-transaction-label'>Transaction Amount </span>
            <input type="text" name="transactionAmount" />
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
            <input type="submit" value="Add transaction" />
          </div>
        </div>

        </form>
      </div>
    </>
  )
}