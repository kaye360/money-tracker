import { Style } from 'react-style-tag'
import useBudgets from '../utils/useBudgets'
import Budget from '../components/budgets/Budget'

export default function Forecast() {





  const budgets = useBudgets({ userId : 1 }).budgets





  return(
    <>
    <Style>
    {`
    `}
    </Style>
    
    <div>
      <h1>Forecast</h1>
    
      
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
            showProgressBar={ true }
            showButtons={ true }
          />
        )
      })
      }



    </div>
    </>
  )
}