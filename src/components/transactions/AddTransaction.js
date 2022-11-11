import { Style } from 'react-style-tag'
import { useContext, useEffect } from 'react'
import { FlashContext, UserContext } from '../../App'
import { addTransaction } from '../../model/transactions.model'

export default function Base({ getUserTransactions, setIsNewTransaction, getUserBudgets, budgets }) {

  // Get Context
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]


  // Load User Budgets
  useEffect( () => {
    try {
      getUserBudgets()
    } catch(error) {
    }
  }, [getUserBudgets])
  


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
      getUserTransactions()

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
      .add-transaction label {
        display : block;
      }

      .add-transaction-label {
        display : block;
      }
    `}
    </Style>
    
    <div className='add-transaction mb2'>
      <h2>Add a Transaction</h2>
      <form onSubmit={ handleAddTransaction }>

        <label>
          <span className='add-transaction-label'>Transaction Name</span>
          <input type="text" name="transactionName" />
        </label>

        <label>
          <span className='add-transaction-label'>Transaction Amount</span>
          <input type="text" name="transactionAmount" />
        </label>

        <label>
          <span className='add-transation-label'>Budget</span>
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

        </form>
      </div>
    </>
  )
}