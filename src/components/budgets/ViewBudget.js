import { Style } from 'react-style-tag'
import { useEffect, useState } from 'react'
import Budget from './Budget'
import { getUserIncome } from '../../model/users.model'
import { useContext } from 'react'
import { UserContext } from '../../App'
import iconEditSmall from '../../assets/img/icon-edit-small.svg'

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

        // fetch response
        const res = await getUserIncome({ userId : user.id })

        // Check/set income
        if (res.error) throw new Error(res.error)
        setIncomeAmount(res.income)
        
      } catch (error) {}
    })()
  }, [user])


  return(
  <>
    <Style>
    {`
      .view-budgets {
      }
      
      .budgets-heading {
        display : flex;
        justify-content : space-between;
        align-items : flex-end;
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
            Income: ${ incomeAmount }/month 
            <button>
              <img src={ iconEditSmall } className="" alt="Edit Income" />
            </button>
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