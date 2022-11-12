import { Style } from 'react-style-tag'
import { useContext, useCallback, useState, useEffect } from 'react'
import { FlashContext, UserContext } from '../../App'
import ViewBudget from '../budgets/ViewBudget'
import { getBudgets } from '../../model/budgets.model'
import ViewTransactions from '../transactions/ViewTransactions'
import { getTransactionsAll } from '../../model/transactions.model'

export default function Dashboard() {

  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]


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
      
      <div className='my2'>
        Welcome { user.name }
      </div>

      <div className='dashboard-items'>
      <ViewBudget 
        budgets={ budgets }
        showButtons={ false }
      />
      
      <ViewTransactions
        getUserTransactions={ getUserTransactions }
        isNewTransaction={ false }
        transactions={ transactions }
        loadUserBudgets={ loadUserBudgets }
        budgets={ budgets }
        maxCount="5"
      />

      
      </div>
    </div>
    </>
  )
}