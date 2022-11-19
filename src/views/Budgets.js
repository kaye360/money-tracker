import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { UserContext } from '../App'

import AddBudget from '../components/budgets/AddBudget'
import ViewBudget from '../components/budgets/ViewBudget'
import TransactionsMonthList from '../components/transactions/TransactionsMonthList'

import useTransactions from '../utils/useTransactions'
import useBudgets from '../utils/useBudgets'


export default function Budgets() {

  // Get context 
  const user = useContext(UserContext)[0]



  // Require Login for this page
  const navigate = useNavigate()
  useEffect( () => { !user && navigate('/req-login') }, [navigate, user])



  // Users Budgets
  // Array of objects {name, amount} or false
  const {budgets, loadBudgets } = useBudgets({userId : user.id})
  


  // Users Transactions
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