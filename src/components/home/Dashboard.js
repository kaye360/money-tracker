import { Style } from 'react-style-tag'
import { useContext } from 'react'
import { UserContext } from '../../App'
import ViewBudget from '../budgets/ViewBudget'
import ViewTransactions from '../transactions/ViewTransactions'
import useBudgets from '../../utils/useBudgets'
import useTransactions from '../../utils/useTransactions'

export default function Dashboard() {


  // Context
  const [ user ] = useContext(UserContext)


  
  // Get Budgets
  const { budgets } = useBudgets({ userId : user.id })
  
    
  
  // Get Transactions
  const { transactions, loadTransactions } = useTransactions({ userId : user.id })
  


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
        gap : 1rem;
        grid-template-columns : 1fr 2fr;
      }

      .filler {
        border : 1px solid grey;
      }
    `}
    </Style>
    
    <div className='dashboard'>
      <h2 className='mb3'>Dashboard</h2>
      
      <div className=''>
        Welcome { user.name }
      </div>

      <div className='dashboard-items'>

      <ViewBudget 
        budgets={ budgets }
        userId={ user.id }
        showButtons={ false }
        showProgressBar={ false }
      />
      
      <ViewTransactions
        loadTransactions={ loadTransactions }
        isNewTransaction={ false }
        transactions={ transactions }
        budgets={ budgets }
        maxCount="5"
      />

      
      </div>
    </div>
    </>
  )
}