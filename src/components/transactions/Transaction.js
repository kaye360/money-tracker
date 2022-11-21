import { useContext, useState } from 'react'
import { Style } from 'react-style-tag'
import { FlashContext, UserContext } from '../../App'
import { deleteTransaction, editTransaction, } from '../../model/transactions.model'
import  iconDelete  from '../../assets/img/icon-delete.svg'
import  iconEdit  from '../../assets/img/icon-edit.svg'
import  iconSave  from '../../assets/img/icon-save.svg'

export default function Transaction({
  name, budget, amount, date, transactionId,
  isNewTransaction, loadTransactions, budgets }) {


  // Get Context
  const [ , setFlash ] = useContext(FlashContext)
  const [ user ] = useContext(UserContext)


  // is Edit mode
  // BOOL true/false
  const [ isEditMode, setIsEditMode ] = useState(false)



  // Human readable date
  // String
  const dateInWords = new Date(date).toDateString().split(' ').slice(1).join(' ')



  // Handle Delete Transaction
  async function handleDeleteTransaction(e) {
    e.preventDefault()

    try {

      // Get/Check/Set response
      const res = await deleteTransaction({transactionId : transactionId})
      if (res.error) throw new Error(res.error)
      loadTransactions({ userId : user.id })

    } catch(error) {

      // Flash error message
      setFlash({ type : 'fail', message : error.message })
    }
  }



  // Handle Edit Transaction
  async function handleEditTransaction(e) {
    e.preventDefault()

    // Get response
    try {
      const res = await editTransaction({
        date : e.target.elements[0].value,
        name : e.target.elements[1].value,
        budget : e.target.elements[2].value,
        amount : e.target.elements[3].value,
        transactionId : transactionId
      })
  
      // Check response, set state
      if(res.error) throw new Error(res.error``)
      setIsEditMode(!isEditMode)
      loadTransactions({ userId : user.id })
      
    } catch (error) {
      console.log(error)
      // Flash error message
      setFlash({ type : 'fail', message : error.message })

    }
  }


  return(
    <>
    <Style>
    {`
      .transaction-buttons {
        display : flex;
        align-items : center;
        gap : 0rem;
        width : fit-content;
      }

      input.transaction-save-btn {
        min-width : 25px;
        min-height : 20px;
        padding : 0.7rem 1rem;
        border : 0;
        outline : 0;
        background-color : transparent;
        background-image : url(${iconSave});
        background-repeat : no-repeat;
        background-position : center;
        cursor : pointer;
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
    isEditMode
    ? 
    
    <tr>

      <td>
        <input 
          type="datetime-local" 
          name="date"
          size="1"
          defaultValue={ date }
          form={ transactionId }
          />
      </td>
      <td>
        <input
          type="text"
          name="name"
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
          step="0.01"
          defaultValue={ amount }
          form={ transactionId }
        />
      </td>
      <td>
        <form onSubmit={ handleEditTransaction } id={ transactionId } name={ transactionId } >
          <div className='transaction-buttons'>
            <input type="submit" value="" className='transaction-save-btn' />
            <button onClick={ handleDeleteTransaction }>
              <img src={ iconDelete } alt="Delete" />
            </button>
          </div>
        </form>
      </td>
    </tr>
    
    : // isEditMode === false
    <tr className={ isNewTransaction ? 'new-transaction' : '' }>
      <td>{dateInWords}</td>
      <td>{name}</td>
      <td>{budget}</td>
      <td>{amount}</td>
      <td>
        <button onClick={ () => setIsEditMode(!isEditMode) }>
          <img src={ iconEdit } alt="Edit" />
        </button>
        <button onClick={ handleDeleteTransaction }>
          <img src={ iconDelete } alt="Delete" />
        </button>
      </td>

    </tr>
    }

    </>
  )
}