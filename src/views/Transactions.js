import { Style } from 'react-style-tag'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState, useCallback } from 'react'

import { FlashContext, UserContext } from '../App'
import { getTransactionsAll } from '../model/transactions.model'

import AddTransaction from '../components/transactions/AddTransaction'
import ViewTransactions from '../components/transactions/ViewTransactions'
import TransactionsMonthList from '../components/transactions/TransactionsMonthList'
import useBudgets from '../utils/useBudgets'



export default function Transactions() {

  // Get Context
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]



  // Require Login for this page
  const navigate = useNavigate()

  useEffect( () => { !user && navigate('/req-login') }, [navigate, user])



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



  const budgets = useBudgets({ userId : user.id }).budgets



  // Newly added transaction. Used for adding a 'flash/fade style' when new transaction is added
  // false or number(transaction_id)
  const [isNewTransaction, setIsNewTransaction] = useState(false)

  

  return(
    <>
    <Style>
    {`

    `}
    </Style>
    
    <div className="transactions">
      <h1 className="px1">Transactions</h1>



      <AddTransaction 
        setIsNewTransaction={ setIsNewTransaction }
        setTransactions={ setTransactions } 
      />      

      <TransactionsMonthList 
        transactions={ transactions }
        routePath='transactions'
      />


      <ViewTransactions 
        getUserTransactions={ getUserTransactions }
        isNewTransaction={ isNewTransaction }
        transactions={ transactions }
        budgets={ budgets }
      />

      
    </div>
    </>
  )
}