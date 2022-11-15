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
  


  // Total amount of all Budgets. Number
  function  totalBudgetsAmount(total=0) {
    budgets.forEach( (budget) => total += Number(budget.amount) )
    return total
  }
  
  

  // Users Transactions
  const { transactions } = useTransactions()


  
  return(
    <>
    <Style>
    {`
      .budgets h1 {
        display : flex;
        justify-content : space-between;
        align-items : flex-end;
        width : 100%;
      }

      .budgets h1 span {
        font-size : 1.2rem;
      }
    `}
    </Style>
    
    <div className='budgets'>
      <h1 className='px1'>
        Budgets
        <span className='budgets-total-amount'>Total ${ totalBudgetsAmount() }/month</span>
      </h1>

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