import { Style } from 'react-style-tag'
import Budget from './Budget'

export default function ViewBudget({ budgets, getUserBudgets }) {

  return(
    <>
    <Style>
    {`
    `}
    </Style>
    
    <div className='view-budgets my2'>
        <h2>Budgets</h2>

        {
          budgets.length === 0 && 'You haven\'t added any budgets yet'
        }

        {
          budgets.map( (budget) => {
            return(
              <Budget 
                name={ budget.name } 
                amount={ budget.amount }
                key={ budget.name } 
                getUserBudgets={ getUserBudgets }
              />
            )
          })
        }


      </div>
    </>
  )
}