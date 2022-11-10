import { Style } from 'react-style-tag'
import { useEffect, useContext } from 'react'
import { FlashContext } from '../../App'
import Transaction from './Transaction'


export default function ViewTransactions({ getUserTransactions, isNewTransaction, transactions }) {

  // Get Context
  const setFlash = useContext(FlashContext)[1]



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






  return(
    <>
    <Style>
    {`
      .transactions-table {
        width : 100%;
        border-collapse : collapse;
        border-bottom : 1px solid #333;
      }

      .transactions-table thead {
        background-color : #f3f3f3;
      }

      .transactions-table td {
        padding-block : 1rem;
      }
    `}
    </Style>
    
    <div className='view-transactions my1'>
        <h2>View Transactions</h2>



        <table className='transactions-table'>

          <thead>
            <tr>
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