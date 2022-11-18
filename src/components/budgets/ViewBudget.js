import { Style } from 'react-style-tag'
import { useEffect, useState, useContext } from 'react'
import Budget from './Budget'
import { getUserIncome } from '../../model/users.model'
import { UserContext } from '../../App'
import iconEditSmall from '../../assets/img/icon-edit-small.svg'
import iconSave from '../../assets/img/icon-save.svg'

export default function ViewBudget({ budgets, loadBudgets, showProgressBar = true , showButtons = true }) {


  // User context
  const [ user ] = useContext(UserContext)


  
  // Total amount of all Budgets. Number
  function  totalBudgetsAmount(total=0) {
    budgets.forEach( (budget) => total += Number(budget.amount) )
    return total
  }
  
    
  // Users Monthly income
  const [incomeAmount, setIncomeAmount] = useState(10)

  useEffect( () => {
    ( async () => {
      try {

        // fetch/check response, set income state
        const res = await getUserIncome({ userId : user.id })
        if (res.error) throw new Error(res.error)
        setIncomeAmount(res.income)
        
      } catch (error) {}
    })()
  }, [user])


  
  // Handle Income Change Input
  function handleIncomeInput(e) {
    setIncomeAmount(e.target.value)
  }



  // Income form is editable or not
  const [incomeIsEditable, setIncomeIsEditable] = useState(false) 



  // Handle Income Change Form
  async function handleChangeIncome(e) {
    console.log('form submit', incomeAmount)
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
        align-items : center;
        column-gap : 1rem;
        width : 100%;
      }

      .budget:nth-child(2n) {
        background-color : var(--clr-primary-1);
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

      @keyframes budget-progress-bar {
        from { transform : scaleX(0); opacity : 0; }
        to { transform : scaleX(1); opacity : 1; }
      }

      .grey { color : #aaa; font-size : 0.8rem; }
    `}
    </Style>
    
    <div className='view-budgets my2'>

    <div className="budgets-heading px1 mb1">
        <h2>Budgets </h2>

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
          <span className='budgets-total-amount'>Total: ${ totalBudgetsAmount() }/month</span>
          <span className='budgets-total-amount bold'>Net: ${ incomeAmount - totalBudgetsAmount() }/month</span>
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