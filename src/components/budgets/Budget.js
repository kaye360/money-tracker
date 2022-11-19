import { useState, useContext } from 'react'
import { Style } from 'react-style-tag'
import { useParams } from 'react-router-dom'
import { deleteBudget, editBudget } from '../../model/budgets.model'
import { FlashContext, UserContext } from '../../App'
import { parseMonth } from '../../utils/date'
import iconDelete from '../../assets/img/icon-delete.svg'
import iconEdit from '../../assets/img/icon-edit.svg'
import iconSave from '../../assets/img/icon-save.svg'
import ProgressBar from './ProgressBar'

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
      const res = await deleteBudget({ userId : user.id, budgetName : name })
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
    case (progressBarWidth > 100): progressBarColor = 'var(--clr-error-dark)'; break
    case (progressBarWidth > 90) && (progressBarWidth <=100): progressBarColor = 'var(--clr-error-light)'; break
    default: progressBarColor = 'var(--clr-primary-3)'
  }




  return(
    <>
    <Style>
    {`
      .budget-buttons {
        display : ${ budgetButtonsDisplay };
        align-items : center;
        gap : 0.5rem;
        margin-left : auto;
      }

      .budget-save-btn {
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

      div.budget-progress-bar-${cssClassName} {
        background-color : ${progressBarColor};
        width : ${ progressBarWidth }%;
      }

    `}
    </Style>
    
      

      {
        isEditMode
        ? 
        
        <form onSubmit={ handleEdit } >
        <div className='budget px1 py1'>
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
            <input type="submit" value="" className='btn budget-save-btn' />

            <button onClick={ handleDeleteBudget } id={ name }>
              <img src={ iconDelete } alt="Delete Budget" />
            </button>
          </div>
        </div>
        </form>

        : // Not Edit Mode
        <div className='budget px1 py1'>
          <span><strong>{ nameInput } :</strong> { showProgressBar && `$${spent} / `} ${ amountInput }</span>

          <div className='budget-buttons'>
            <button className='budget-edit-btn' onClick = { () => setIsEditMode(!isEditMode) } >
              <img src={ iconEdit } alt="Edit Budget" />
            </button>
            <button onClick={ handleDeleteBudget } id={ name }>
              <img src={ iconDelete } alt="Delete Budget" />
            </button>
          </div>
        </div>
      }
      
      { showProgressBar && <ProgressBar cssClassName={ cssClassName } /> }


    </>
  )
}