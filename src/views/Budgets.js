import { useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { FlashContext, UserContext } from '../App'

import AddBudget from '../components/budgets/AddBudget'
import ViewBudget from '../components/budgets/ViewBudget'
import TransactionsMonthList from '../components/transactions/TransactionsMonthList'

import { getBudgets } from '../model/budgets.model'
import { getTransactionsAll } from '../model/transactions.model'


export default function Budgets() {

  // Get context 
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]



  // Require Login for this page
  const navigate = useNavigate()
  useEffect( () => { !user && navigate('/req-login') }, [navigate, user])
  



  // Load User Budgets or Flash error
  const loadUserBudgets = useCallback( async () => {

    try {

      // Get/Check/Set Budgets
      const budgetRes = await getBudgets({ 'userId' : user.id })
      if(budgetRes.error) throw new Error(budgetRes.error)

      // Set Budget State
      setBudgets( budgetRes )
      
    } catch (error) {

      // Flash Error message
      setFlash({ type : 'fail', message : error.message })

    }
  }, [user.id, setFlash])


  

  // Users Budgets
  // Array of objects {name, amount} or false
  const [budgets, setBudgets] = useState([])
  
  // load budgets
  useEffect( () => {
    try {
      loadUserBudgets()
    } catch(error) {
      setFlash({ type : 'fail', message : error.message })
    }
  }, [loadUserBudgets, setFlash])




  // Total amount of all Budgets. Number
  function  totalBudgetsAmount(total=0) {
    budgets.forEach( (budget) => total += Number(budget.amount) )
    return total
  }
  
  

  // Users Transactions
  // Array of Objects
  const [transactions, setTransactions] = useState([])



  // Get User transactions
  const getUserTransactions = useCallback( async () => {

    try {

      // Get/Check/Set Transactions, set state  
      const res = await getTransactionsAll({ userId : user.id })
      if(res.error) throw new Error(res.error)
      setTransactions( res )
      
    } catch (error) {

      // Flash error message
      setFlash({ type : 'fail', message : error.message })

    }

  }, [user.id, setFlash]) 



  // Load Transactions
  useEffect( () => { getUserTransactions() }, [getUserTransactions])


  
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
        budgets={ budgets }
        loadUserBudgets={ loadUserBudgets }
        showProgressBar={ false }
      />

      <AddBudget
        loadUserBudgets={ loadUserBudgets }
      />
    
    </div>
    </>
  )
}