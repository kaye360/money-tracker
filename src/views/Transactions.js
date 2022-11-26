// 
// Users Transactions View
// Display and manage users transactions
// 

// Dependencies
import { Style } from 'react-style-tag'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'

// Components
import AddTransaction from '../components/transactions/AddTransaction'
import ViewTransactions from '../components/transactions/ViewTransactions'
import TransactionsMonthList from '../components/transactions/TransactionsMonthList'

// Utils
import useBudgets from '../utils/useBudgets'
import useTransactions from '../utils/useTransactions'





export default function Transactions() {

  //
  // Get Context
  //
  const [ user ] = useContext(UserContext)

  //
  // Require Login for this page
  //
  const navigate = useNavigate()
  useEffect( () => { !user && navigate('/req-login') }, [navigate, user])

  //
  // Get Transactions 
  //
  const { transactions, loadTransactions } = useTransactions({ userId : user.id })

  //
  // Get Budgets
  //
  const { budgets } = useBudgets({ userId : user.id })

  //
  // Newly added transaction. 
  // Used for adding a 'flash/fade style' when new transaction is added
  // number(transaction_id) or false
  //
  const [isNewTransaction, setIsNewTransaction] = useState(false)

  


  
  return(
    <>
    <Style>
    {`

    `}
    </Style>
    
    <div className="transactions px2">

      <h1 className="px1">Transactions</h1>

      <AddTransaction 
        setIsNewTransaction={ setIsNewTransaction }
        loadTransactions={ loadTransactions }
      />      

      <TransactionsMonthList 
        transactions={ transactions }
        routePath='transactions'
      />

      <ViewTransactions 
        loadTransactions={ loadTransactions }
        isNewTransaction={ isNewTransaction }
        transactions={ transactions }
        budgets={ budgets }
      />
      
    </div>
    </>
  )
}