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
      .transactions-grid {

      }

      .transaction-grid-row {
        display : grid;
        grid-template-columns : repeat(4, 1fr) repeat(2, 0.5fr);
        
        padding : 0.5rem;
      }

      .transaction-grid-row input {
        border : 1px solid red;
        max-width : min-content;
        width : min-content;
        min-width : 10px;
      }

      .transactions-grid-head {
        background-color : #f3f3f3;
      }
    `}
    </Style>
    
    <div className='view-transactions my1'>
        <h2>View Transactions</h2>


        <div className='transactions-grid'>

          <div className='transaction-grid-row transactions-grid-head'>

            <div>Date</div>
            <div>Name</div>
            <div>Category</div>
            <div>Amount</div>
            <div>Edit</div>
            <div>Delete</div>

          </div>

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
        </div>

        {
          transactions.length === 0 && 'You dont\'t have any transactions yet'
        }

      </div>
    </>
  )
}