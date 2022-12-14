/*
View List of User Budgets Component

Params:

budgets {[]}, loadbudgets ():
  -> from useBudgets hook
  -> budgets is list of users budgets
  -> loadbudgets gets budgets from DB. Used after DB is changed

showProgressBar BOOL
  -> Show the amount spent in the current month in the form of a progress bar

showButtons BOOL  
  -> Whether or not to show edit/delete budget buttons
*/

// Depencies
import { Style } from 'react-style-tag'
import { useEffect, useState, useContext } from 'react'
import { FlashContext, UserContext } from '../../App'

// Utils
import { getUserIncome, setUserIncome } from '../../model/users.model'

// Components
import Budget from './Budget'

// Assets
import iconEditSmall from '../../assets/img/icon-edit-small.svg'
import iconSave from '../../assets/img/icon-save.svg'





export default function ViewBudget({ budgets, loadBudgets, showProgressBar = true , showButtons = true }) {

  // 
  // Gets contexts
  // 
  const [ user ] = useContext(UserContext)
  const [ , setFlash ] = useContext(FlashContext)

  // 
  // Total $ amount of all Budgets combined. Float
  // 
  function  totalBudgetsAmount(total=0) {
    budgets.forEach( (budget) => total += Number(budget.amount) )
    return parseFloat((total).toFixed(2))
  }
  
  // 
  // Users Monthly income
  // 
  const [incomeAmount, setIncomeAmount] = useState(0)

  // 
  // Load/set users monthly income
  // 
  useEffect( () => {
    ( async () => {
      try {

        const res = await getUserIncome({ userId : user.id })
        if (res.error) throw new Error(res.error)
        setIncomeAmount(res.income)
        
      } catch (error) {}
    })()
  }, [user])

  // 
  // Users Net Income
  // 
  const netIncomeAmount = parseFloat(( incomeAmount - totalBudgetsAmount() ).toFixed(2))
  
  // 
  // Handle Income Change of Input/State
  // 
  function handleIncomeInput(e) {
    setIncomeAmount(e.target.value)
  }

  // 
  // Income form is editable or not
  // 
  const [incomeIsEditable, setIncomeIsEditable] = useState(false) 

  // 
  // Handle Income Change Form
  // 
  async function handleChangeIncome(e) {
    e.preventDefault()

    try {

      setUserIncome({ userId : user.id, amount : incomeAmount })
      setIncomeIsEditable(false)
      
    } catch (error) {
      
      // Flash Error message
      setFlash({ type : 'error', message : error.message })
    }
  }

  return(
  <>
    <Style>
    {`
      .view-budgets {
      }
      
      .budgets-heading {
        display : flex;
        flex-wrap : wrap;
        justify-content : space-between;
        align-items : flex-end;
        row-gap : 1rem;
        width : 100%;
      }

      .budgets-total-amount {
        display : block;
        font-size : 1.2rem;
        width : max-content;
      }

      .budget {
        display : flex;
        flex-wrap : wrap;
        align-items : center;
        column-gap : 1rem;
        width : 100%;
      }

      .budget:nth-child(2n) {
        background-color : var(--clr-primary-1);
      }

      .budget-title-link {
        color : #333;
        font-weight : 600;
      }

      .budget-title-link:hover {
        text-decoration : underline;
      }

      .budget-progress-bar-wrapper {
        width : 100%;
        height : 15px;
        background-color : none;
        overflow : hidden;
      }

      .budget-progress-bar {
        width : 0%;
        height : 15px;
        transform-origin : left center;
        animation : budget-progress-bar 1.5s ease-out both;
      }

      @keyframes budget-progress-bar {
        from { transform : scaleX(0); opacity : 0; }
        to { transform : scaleX(1); opacity : 1; }
      }

      .grey { color : #aaa; font-size : 0.8rem; }
    `}
    </Style>
    
    <div className='view-budgets my2'>

    <div className="budgets-heading px1 mb2">
        <h2 className='my0'>Current Budgets </h2>

        <div>
          <span className='budgets-total-amount'>
            {
              incomeIsEditable
                ? <form onSubmit={ handleChangeIncome } id="edit-income-form">
                    <input type="number" value={ incomeAmount } onChange={ handleIncomeInput } />
                    <button type="button" onClick={ (e) => {
                        handleChangeIncome(e)
                        setIncomeIsEditable(!incomeIsEditable) 
                    } } >
                      <img src={ iconSave } alt="Save Income" />
                    </button>
                  </form> 
                  
                : <>
                    Income: ${ incomeAmount }/month
                    <button onClick={ () => setIncomeIsEditable(!incomeIsEditable) }>
                      <img src={ iconEditSmall }alt="Edit Income" />
                    </button>
                  </>
            }
          </span>
          <span className='budgets-total-amount'>Expenses: ${ totalBudgetsAmount() }/month</span>
          <span className='budgets-total-amount bold'>Net: ${ netIncomeAmount }/month</span>
        </div>
      </div>

      {
      budgets.length === 0 && 'You haven\'t added any budgets yet'
      }

      {
      budgets.map( (budget) => {
        return(
          <Budget 
            name={ budget.name } 
            amount={ budget.amount }
            spent={ budget.spent }
            key={ budget.name } 

            showProgressBar={ showProgressBar }
            showButtons={ showButtons }

            loadBudgets={ loadBudgets }
          />
        )
      })
      }


    </div>
  </>
  )
}