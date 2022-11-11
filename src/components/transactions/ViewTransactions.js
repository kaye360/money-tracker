import { Style } from 'react-style-tag'
import { useEffect, useContext } from 'react'
import { FlashContext } from '../../App'
import Transaction from './Transaction'


export default function ViewTransactions({ getUserTransactions, isNewTransaction, transactions, getUserBudgets, budgets }) {

  // Get Context
  const setFlash = useContext(FlashContext)[1]



  // get Transactions
  useEffect( () => {
    try {
      getUserTransactions()
    } catch (error) {
      setFlash({
        type : 'fail',
        message : error.message
      })
    }
  }, [getUserTransactions, setFlash])



  // Get Budgets
  useEffect( () => {
    try {
      getUserBudgets()
    } catch(error) {
    }
  }, [getUserBudgets])




  return(
    <>
    <Style>
    {`
      .transactions-table {
        width : 100%;
      }

      .transactions-table td {
        padding : 0.5rem 0;
      }

      .transactions-table-head {
        background-color : #f3f3f3;
      }
    `}
    </Style>
    
    <div className='view-transactions my1'>
      <h2>View Transactions</h2>


      <table className='transactions-table'>

        <thead>
          <tr className='transaction-grid-row transactions-table-head'>

            <td>Date</td>
            <td>Name</td>
            <td>Category</td>
            <td>Amount</td>
            <td>Edit</td>
            <td>Delete</td>

          </tr>
        </thead>

        <tbody>

          {
            transactions.map( transaction => {
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
                  } )
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