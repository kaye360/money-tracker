// 
// Dashboard Component
// 

// Dependencies
import { Style } from 'react-style-tag'
import { useContext } from 'react'
import { UserContext } from '../../App'

// Utils
import useBudgets from '../../utils/useBudgets'
import useTransactions from '../../utils/useTransactions'

// Components
import ViewBudget from '../budgets/ViewBudget'
import ViewTransactions from '../transactions/ViewTransactions'
import ViewForecast from '../forecast/ListForecastEntries'
import useForecast from '../../utils/useForecast'





export default function Dashboard() {

  // 
  // Get Contexts
  // 
  const [ user ] = useContext(UserContext)

  // 
  // Get month as YYYY-DD
  // 
  let month = new Date()
  month = `${month.getFullYear()}-${month.getMonth() + 1}`

  // 
  // Get User Budgets in month
  // 
  const { budgets } = useBudgets({ userId : user.id, month : month })
  
    
  // 
  // Get Transactions
  // 
  const { transactions, loadTransactions } = useTransactions({ userId : user.id })
  
  // 
  // Get Forecast Entries
  // 
  const { forecastEntries } = useForecast({ userId : user.id })

  
  return(
    <>
    <Style>
    {`
      .dashboard {
        min-height : 300px;
        border : 1px solid #eee;
      }

      .dashboard-items {
        display : grid;
        align-items : stretch;
        gap : 2rem;
        grid-template-columns : 1fr 2fr;
      }

      .filler {
        border : 1px solid grey;
      }
    `}
    </Style>
    
    <div className='dashboard px2 py2'>
      <h2 className='px1 mb3'>Dashboard</h2>
      
      <div className='px1 fs3'>
        Welcome, { user.name }
      </div>

      <div className='dashboard-items'>

      <ViewBudget 
        budgets={ budgets }
        userId={ user.id }
        showButtons={ false }
      />

      <div>

        <h2>1 Week Forecast</h2>
        <ViewForecast 
          amountOfDays={ 7 }
          forecastEntries={ forecastEntries }
        />

      </div>

      <div></div>
      
      <ViewTransactions
        loadTransactions={ loadTransactions }
        isNewTransaction={ false }
        transactions={ transactions }
        budgets={ budgets }
        maxCount="7"
      />

      </div>
    </div>
    </>
  )
}