import { useContext, useState } from 'react'
import { Style } from 'react-style-tag'
import { FlashContext } from '../../App'
import { deleteTransaction, } from '../../model/transactions.model'

export default function Transaction({
  name, budget, amount, date, 
  isNewTransaction, transactionId, getUserTransactions, handleEditTransaction}) {

  // Get Context
  const setFlash = useContext(FlashContext)[1]

  // is Edit mode - BOOL true/false
  const [isEditMode, setIsEditMode] = useState(false)

  // Format Date
  const dateInWords = new Date(date).toDateString().split(' ').slice(1).join(' ')
  date = date.split(' ')[0] 




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
  async function handleEditTransaction(e) {
    e.preventDefault()
    console.log(e)

    setIsEditMode(!isEditMode)
  }




  return(
    <>
    <Style>
    {`

    
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
    isEditMode
    ?
    <form onSubmit={ handleEditTransaction } >
    <div className='transaction-grid-row'>

      <div>
        <input 
          type="date" 
          name="date"
          size="1"
          value={ date }
          onChange={ () => {} }
          />
      </div>
      <div>
        <input
          type="text"
          name="name"
          size="1"
          value={ name }
          onChange={ () => {} }
          />
      </div>
      <div>
        <select>
          <option value="Uncategorized">--Uncategorized</option>
        </select>
      </div>
      <div>
        <input 
          type="number"
          name="amount"
          size="1"
          value={ amount }
          onChange={ () => {} }
        />
      </div>
      <div>
        <input type="submit" value="Save" />
      </div>
      <div>
        <button onClick={ handleDeleteTransaction }>
            DD
        </button>
      </div>
    </div>
    </form>
    
    :
    <div className={ isNewTransaction ? 'transaction-grid-row new-transaction' : 'transaction-grid-row' }>
      <div>{dateInWords}</div>
      <div>{name}</div>
      <div>{budget}</div>
      <div>{amount}</div>
      <div>
        <button onClick={ () => setIsEditMode(!isEditMode) }>
          EE
        </button>
      </div>
      <div>
        <button onClick={ handleDeleteTransaction }>
          DD
        </button>
      </div>

    </div>
    }

    </>
  )
}