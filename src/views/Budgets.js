// 
// Budgets Page View
// Display and Manage Users budgets
// 

// Dependencies
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { UserContext } from '../App'

// Components
import AddBudget from '../components/budgets/AddBudget'
import ViewBudget from '../components/budgets/ViewBudget'
import TransactionsMonthList from '../components/transactions/TransactionsMonthList'

// Utils
import useTransactions from '../utils/useTransactions'
import useBudgets from '../utils/useBudgets'





export default function Budgets() {

  //
  // Get contexts
  //
  const [ user, ] = useContext(UserContext)

  // 
  // Require Login for this page
  // 
  const navigate = useNavigate()
  useEffect( () => { !user && navigate('/req-login') }, [navigate, user])

  //
  // Users Budgets
  // 
  const {budgets, loadBudgets } = useBudgets({userId : user.id})
  
  // 
  // Users Transactions
  //
  const { transactions } = useTransactions({ userId: user.id })




  
  return(
    <>
    <Style>
    {`

    `}
    </Style>
    
    <div className='budgets px2 py2'>

      <h1>Your Budgets</h1>

      <TransactionsMonthList 
        transactions={ transactions } 
        routePath='budgets'
      />

      <ViewBudget 
        userId={ user.id }
        budgets={ budgets }
        loadBudgets={ loadBudgets }
        showProgressBar={ false }
      />

      <AddBudget 
        loadBudgets={ loadBudgets }
      />
    
    </div>
    </>
  )
}