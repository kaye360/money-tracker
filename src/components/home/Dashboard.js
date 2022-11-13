import { Style } from 'react-style-tag'
import { useContext, useCallback, useState } from 'react'
import { FlashContext, UserContext } from '../../App'
import ViewBudget from '../budgets/ViewBudget'
import ViewTransactions from '../transactions/ViewTransactions'
import { getTransactionsAll } from '../../model/transactions.model'
import useBudgets from '../../utils/useBudgets'

export default function Dashboard() {

  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]


  
  const budgets = useBudgets({ userId : user.id }).budgets
  
    

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
        getUserTransactions={ getUserTransactions }
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