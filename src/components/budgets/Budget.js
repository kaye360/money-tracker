import { useState, useContext } from 'react'
import { Style } from 'react-style-tag'
import { deleteBudget, editBudget } from '../../model/budgets'
import { FlashContext, UserContext } from '../../App'

export default function Budget({ name, amount, getUserBudgets }) {

  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]

  const [isEditMode, setIsEditMode] = useState()
  const [nameInput, setNameInput] = useState(name)
  const [amountInput, setAmountInput] = useState(amount)

  // Handle Delete
  async function handleDeleteBudget(e) {
    e.preventDefault()

    try {

      const res = await deleteBudget({
        'userId' : user.id,
        'budgetName' : e.target.id
      })
      
      if (res.error) throw new Error(res.error)

      getUserBudgets()

    } catch (error) {

      setFlash({
        'type' : 'fail',
        'message' : error.message
      })

    }
 }



 async function handleEdit(e) {
  e.preventDefault()
  setIsEditMode(!isEditMode)

  console.log(nameInput, amountInput)
 }


  return(
    <>
    <Style>
    {`
      .budget {
        display : flex;
        column-gap : 1rem;
        row-gap : 0.5rem;
        width : 100%;
      }

      .budget-buttons {
        display : flex;
        gap : 0.5rem;
        margin-left : auto;
      }

      .budget-progress-bar {
        width : 100%;
        height : 0.7rem;
        margin-top : 0.5rem;
        border : 1px solid #ccc;
      }
    `}
    </Style>
    

      {
        isEditMode
        ? 
        <>
          <form onSubmit={ handleEdit } >
          <div className='budget my2'>
            <input 
              type="text" 
              name="name" 
              value={ nameInput } 
              onChange={ (e) => setNameInput(e.target.value) } 
            />
            
            <input 
              type="number" 
              name="amount" 
              value={ amountInput }
              onChange={ (e) => setAmountInput(e.target.value) }
            />

            <div className='budget-buttons'>
              <input type="submit" value="Save" className='budget-edit-btn' />
              <button onClick={ handleDeleteBudget } id={ name }>Delete</button>
            </div>
          </div>
          </form>
        </>

        : 
        <div className='budget mt1'>
          <span>{ nameInput } : { amountInput }</span>

          <div className='budget-buttons'>
            <button className='budget-edit-btn' onClick = { () => setIsEditMode(!isEditMode) } >Edit</button>
            <button onClick={ handleDeleteBudget } id={ name }>Delete</button>
          </div>
        </div>
      }
      



    <div className='budget-progress-bar mb1'>
    </div>
    </>
  )
}