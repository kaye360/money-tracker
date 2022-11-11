import { useContext, useState } from 'react'
import { Style } from 'react-style-tag'
import { FlashContext } from '../../App'
import { deleteTransaction, editTransaction, } from '../../model/transactions.model'

export default function Transaction({
  name, budget, amount, date, 
  isNewTransaction, transactionId, getUserTransactions, budgets }) {

  // Get Context
  const setFlash = useContext(FlashContext)[1]

  // is Edit mode - BOOL true/false
  const [isEditMode, setIsEditMode] = useState(false)

  // Format Date
  const dateInitial = date
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
    
    try {
      const res = await editTransaction({
        date : e.target.elements[0].value,
        name : e.target.elements[1].value,
        budget : e.target.elements[2].value,
        amount : e.target.elements[3].value,
        transactionId : transactionId
      })
  
      if(res.error) throw new Error(res.error``)
      
      setIsEditMode(!isEditMode)
      getUserTransactions()
      
    } catch (error) {
      setFlash({
        type : 'fail',
        message : error.message
      })
    }
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
    
    <tr>

      <td>
        <input 
          type="datetime-local" 
          name="date"
          size="1"
          defaultValue={ dateInitial }
          form={ transactionId }
          />
      </td>
      <td>
        <input
          type="text"
          name="name"
          size="1"
          defaultValue={ name }
          form={ transactionId }
          />
      </td>
      <td>
        <select form={ transactionId } >
          <option value={ budget }>{ budget }</option>
          {
            budgets.map( budget => {
              return(
                <option value={ budget.name } key={budget.name} >{ budget.name }</option>
              )
            })
          }
          <option value="Uncategorized">--Uncategorized</option>
        </select>
      </td>
      <td>
        <input 
          type="number"
          name="amount"
          size="1"
          defaultValue={ amount }
          form={ transactionId }
        />
      </td>
      <td>
        <form onSubmit={ handleEditTransaction } id={ transactionId } name={ transactionId } >
          <input type="submit" value="Save" />
        </form>
      </td>
      <td>
        <button onClick={ handleDeleteTransaction }>
            DD
        </button>
      </td>
    </tr>
    
    :
    <tr className={ isNewTransaction ? 'new-transaction' : '' }>
      <td>{dateInWords}</td>
      <td>{name}</td>
      <td>{budget}</td>
      <td>{amount}</td>
      <td>
        <button onClick={ () => setIsEditMode(!isEditMode) }>
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