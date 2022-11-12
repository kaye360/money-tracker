import { Style } from 'react-style-tag'
import { useEffect, useContext } from 'react'
import { FlashContext } from '../../App'
import Transaction from './Transaction'


export default function ViewTransactions({ getUserTransactions, isNewTransaction, transactions, getUserBudgets, budgets, maxCount = false }) {

  // Get Context
  const setFlash = useContext(FlashContext)[1]



  // load Transactions
  useEffect( () => {
    try {
      getUserTransactions()
    } catch (error) {
      setFlash({ type : 'fail', message : error.message })
    }
  }, [getUserTransactions, setFlash])



  // load Budgets
  useEffect( () => { 
    try { getUserBudgets() } catch(error) {} }, [getUserBudgets]
  )



  return(
    <>
    <Style>
    {`
      .transactions-table {
        width : 100%;
      }

      .transactions-table td {
        min-width : 100px;
        padding : 0.5rem 0.4rem;
      }

      .transactions-table tr:nth-child(2n) {
        background-color : #f4f4f4;
      }

      .transactions-table-head {
        background-color : #f0f0f0;
      }

      .transactions-table input:not([type=submit]) {
        width : 100px;
      }
    `}
    </Style>
    
    <div className='view-transactions my2'>
      <h2 className='my1'>
        { maxCount ? 'Recent' : 'All' } Transactions
      </h2>


      <table className='transactions-table'>

        <thead>
          <tr className='transaction-grid-row transactions-table-head'>

            <td>Date</td>
            <td>Name</td>
            <td>Budget</td>
            <td>Amount</td>
            <td>Action</td>

          </tr>
        </thead>

        <tbody>
          {
            maxCount && 
            transactions.map( (transaction, index) => {
              return(
                <>
                { 
                index < maxCount
                  ? <Transaction 
                      name={ transaction.name }
                      budget={ transaction.budget }
                      amount={ transaction.amount }
                      date={ transaction.date }
                      transactionId={ transaction.transaction_id }
                      key={ transaction.transaction_id }

                      isNewTransaction = { transaction.transaction_id === isNewTransaction }
                      getUserTransactions={ getUserTransactions }
                      budgets={ budgets }
                      />
                  : <tr key={ transaction.transaction_id }></tr>

                }
                    
                  </>
                )
              }
            )

          }
          {
            !maxCount &&
            transactions.map( (transaction) => {
              return(
                <Transaction 
                    name={ transaction.name }
                    budget={ transaction.budget }
                    amount={ transaction.amount }
                    date={ transaction.date }
                    transactionId={ transaction.transaction_id }
                    key={ transaction.transaction_id }

                    isNewTransaction = { transaction.transaction_id === isNewTransaction }
                    getUserTransactions={ getUserTransactions }
                    budgets={ budgets }
                    />
                )
            })
          }
        </tbody>
      </table>

      {
        transactions.length === 0 && 'You dont\'t have any transactions yet'
      }

      </div>
    </>
  )
}