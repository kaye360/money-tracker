import { useContext, useEffect, useState, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { FlashContext, UserContext } from '../App'

import AddBudget from '../components/budgets/AddBudget'
import ViewBudget from '../components/budgets/ViewBudget'
import TransactionsMonthList from '../components/transactions/TransactionsMonthList'

import { getTransactionsAll } from '../model/transactions.model'
import { parseMonth } from '../utils/date'
import useBudgets from '../utils/useBudgets'

export default function BudgetsMonthly() {



  // Context/Params
  const [ user ] = useContext(UserContext)
  const [ setFlash ] = useContext(FlashContext)
  const month = parseMonth( useParams().month )


  // Require Login for this page
  const navigate = useNavigate()
  useEffect( () => { !user && navigate('/req-login') }, [navigate, user])



  // User Budgets
  const { budgets, loadBudgets } = useBudgets({userId : user.id, month : month.asNumber })
  


  // Total $ amount of all Budgets. Number
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
        Budgets hi
        <span className='budgets-total-amount'>Total ${ totalBudgetsAmount() }/month</span>
      </h1>

      <div className="my1 px1">
        <Link to='/budgets'>Back to Budgets</Link>
      </div>

      <TransactionsMonthList 
        transactions={ transactions } 
        routePath='budgets'
      />

      <ViewBudget 
        budgets={ budgets }
        loadBudgets={ loadBudgets }
      />

      <AddBudget
      />
    
    </div>
    </>
  )
}