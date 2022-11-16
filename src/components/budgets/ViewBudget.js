import { Style } from 'react-style-tag'
import Budget from './Budget'

export default function ViewBudget({ budgets, loadBudgets, showProgressBar = true , showButtons = true }) {

  return(
  <>
    <Style>
    {`
      .view-budgets {
        padding : 1rem;
      }

      .view-budgets h2 {
        margin-block : 1rem;
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

      
    `}
    </Style>
    
    <div className='view-budgets my2'>
      <h2>Budgets </h2>

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