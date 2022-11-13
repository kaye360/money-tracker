import { useState, useContext } from 'react'
import { Style } from 'react-style-tag'
import { useParams } from 'react-router-dom'
import { deleteBudget, editBudget } from '../../model/budgets.model'
import { FlashContext, UserContext } from '../../App'
import { parseMonth } from '../../utils/date'

export default function Budget({ name, amount, spent, loadBudgets, showProgressBar = false , showButtons = true }) {

  // Context/Params
  const [ user ] = useContext(UserContext)
  const [ , setFlash ] = useContext(FlashContext)
  const month = parseMonth( useParams().month )
  
  

  // Edit mode
  const [isEditMode, setIsEditMode] = useState(false) // BOOL true or false
  const [nameInput, setNameInput] = useState(name) // String or false
  const [amountInput, setAmountInput] = useState(amount) // Number or false
  


  // Handle Delete
  async function handleDeleteBudget(e) {
    e.preventDefault()

    try {

      // Get/Check/Set response
      const res = await deleteBudget({ userId : user.id, budgetName : e.target.id })
      if (res.error) throw new Error(res.error)

      // ReRender with new Budgets
      month.asNumber 
      ? loadBudgets({ userId : user.id, month : month.asNumber })
      : loadBudgets({ userId : user.id })

      // Flash Success
      setFlash({type : 'success', message : `Succesfully deleted ${e.target.id}`})

    } catch (error) {

      // Flash error message
      setFlash({ type : 'fail', message : error.message })

    }
  }



  // Handle edit
  async function handleEdit(e) {
    e.preventDefault()
    
    try {

      // Get response
      const res = await editBudget({ userId : user.id, oldName : name, newName : nameInput, newAmount : amountInput })

      // Check/Set reponse
      if(res.error) throw new Error(res.error)
      setIsEditMode(!isEditMode)
      
      // ReRender with new Budgets
      month.asNumber 
        ? loadBudgets({ userId : user.id, month : month.asNumber })
        : loadBudgets({ userId : user.id })

    } catch (error) {

      // Flash Error message
      setFlash({ type : 'fail',  message : error.message })
    
    }

  }



  // CSS variables
  const progressBarWidth = spent / amountInput * 100
  const cssClassName = name.replace(/\s+/g, '')
  const budgetButtonsDisplay = showButtons ? 'flex' : 'none'
  let progressBarColor

  switch (true) {
    case (progressBarWidth > 100): progressBarColor = '#FFB8B8'; break
    case (progressBarWidth > 90) && (progressBarWidth <=100): progressBarColor = '#FFE3B8'; break
    default: progressBarColor = '#C5FCE1'
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
        display : ${ budgetButtonsDisplay };
        gap : 0.5rem;
        margin-left : auto;
      }

      .budget-progress-bar-wrapper {
        width : 100%;
        height : 15px;
        margin-top : 0.5rem;
        border : 1px solid #aaa;
        overflow : hidden;
      }

      .budget-progress-bar {
        width : 0%;
        height : 15px;
        transform-origin : left center;
        animation : budget-progress-bar 1.5s ease-out both;
      }
      
      div.budget-progress-bar-${cssClassName} {
        background-color : ${progressBarColor};
        width : ${ progressBarWidth }%;
      }

      @keyframes budget-progress-bar {
        from { transform : scaleX(0); opacity : 0; }
        to { transform : scaleX(1); opacity : 1; }
      }
    `}
    </Style>
    
      

      {
        isEditMode
        ? 
        
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

        : // Not Edit Mode
        <div className='budget mt1'>
          <span>{ nameInput } : { showProgressBar && `$${spent} / `} ${ amountInput }</span>

          <div className='budget-buttons'>
            <button className='budget-edit-btn' onClick = { () => setIsEditMode(!isEditMode) } >Edit</button>
            <button onClick={ handleDeleteBudget } id={ name }>Delete</button>
          </div>
        </div>
      }
      


      {
      showProgressBar &&
        <div className='budget-progress-bar-wrapper mb1'>
          <div className={`budget-progress-bar budget-progress-bar-${cssClassName}`}></div>
        </div>
      }
    </>
  )
}