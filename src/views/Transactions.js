import { Style } from 'react-style-tag'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState, useCallback } from 'react'

import { FlashContext, UserContext } from '../App'
import { getTransactionsAll, getDateRange } from '../model/transactions.model'
import { getBudgets } from '../model/budgets.model'



import AddTransaction from '../components/transactions/AddTransaction'
import ViewTransactions from '../components/transactions/ViewTransactions'

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



  // Users Budgets
  // Array of objects {name, amount} or false
  const [budgets, setBudgets] = useState([])  



  // Get User Budgets - For Add/Edit Transaction form
  const getUserBudgets = useCallback( async () => {

    try {

      // Get/Check budgets, set budgets to rewsponse value
      const res = await getBudgets({ 'userId' : user.id })
      if(res.error) throw new Error(res.error)
      setBudgets( res )
      
    } catch (error) {

       // Display error message
       setFlash({ type : 'fail', message : error.message })

    }
  }, [user.id, setFlash])



  // Newly added transaction. Used for adding a 'flash/fade style' when new transaction is added
  // false or number(transaction_id)
  const [isNewTransaction, setIsNewTransaction] = useState(false)

  

  // Date Range
  // object { minDate, maxDate } or { error }
  const [transactionDateRange, setTransactionDateRange] = useState({})



  // Get Date Range from DB or Flash error
  useEffect( () => {
    ( async () => {
      try {

        // Get/Check/Set Date Range
        const dateRange = await getDateRange(user.id)
        if (dateRange.error) throw new Error(dateRange.error)
        setTransactionDateRange(dateRange)

      } catch (error) {

          // Flash error message
          setFlash({ type : 'fail', message : error.message })
          
      }
    })()
  }, [setFlash, user.id])




  return(
    <>
    <Style>
    {`


    `}
    </Style>
    
    <div className="transactions">
      <h1 className="px1">Transactions</h1>



      <AddTransaction 
        getUserTransactions={ getUserTransactions }
        setIsNewTransaction={ setIsNewTransaction }
        setTransactions={ setTransactions } 
        getUserBudgets={ getUserBudgets }
        budgets={ budgets }
      />      

      {
      transactionDateRange &&
        <div>
          Min: { transactionDateRange.min } <br />
          Max: { transactionDateRange.max } <br />
        </div>
      }

      <ViewTransactions 
        getUserTransactions={ getUserTransactions }
        isNewTransaction={ isNewTransaction }
        transactions={ transactions }
        getUserBudgets={ getUserBudgets }
        budgets={ budgets }
      />

      
    </div>
    </>
  )
}