import { useContext, useState } from 'react'
import { Style } from 'react-style-tag'
import { FlashContext } from '../../App'
import { deleteTransaction } from '../../model/transactions.model'

export default function Transaction({name, budget, amount, date, isNewTransaction, transactionId, getUserTransactions}) {

  // Get Context
  const setFlash = useContext(FlashContext)[1]

  // is Edit mode - BOOL true/false
  const [isEditMode, setIsEditMode] = useState(false)

  // Format Date
  date = new Date(date).toDateString().split(' ').slice(1).join(' ')



  // Handle Delete Transaction
  async function handleDeleteTransaction(e) {
    e.preventDefault()

    try {
      const res = await deleteTransaction({transactionId : transactionId})
      
      if (res.error) throw new Error(res.error)

      getUserTransactions()

    } catch(error) {
      setFlash({
        type : 'fail',
        message : error.message
      })
    }
  }



  // Handle Edit Transaction



  return(
    <>
    <Style>
    {`
      .transaction {
        padding : 0.5rem;
      }
    
      .new-transaction {
        animation : new-transaction 1s linear;
      }

      @keyframes new-transaction {
        from {
          background-color : #C5EBFC;
        }
        to {
          background-color : transparent;
        }
      }
    `}
    </Style>
    

        { 
        <tr className={ isNewTransaction ? 'transaction new-transaction' : 'transaction' }>
          <td>{date}</td>
          <td>{name}</td>
          <td>{budget}</td>
          <td>{amount}</td>
          <td>
            <button>
              EE
            </button>
          </td>
          <td>
            <button onClick={ handleDeleteTransaction }>
              DD
            </button>
          </td>
        </tr>
        }

    </>
  )
}