import { Style } from 'react-style-tag'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState, useCallback } from 'react'

import { UserContext } from '../App'
import { getTransactionsAll } from '../model/transactions.model'



import AddTransaction from '../components/transactions/AddTransaction'
import ViewTransactions from '../components/transactions/ViewTransactions'

export default function Transactions() {

  // Get Context
  const user = useContext(UserContext)[0]
  


  // Require Login for this page
  const navigate = useNavigate()

  useEffect( () => {
    !user && navigate('/req-login')
  }, [navigate, user])



  // Users Transactions
  // Array of Objects
  const [transactions, setTransactions] = useState([])



  // Get User transactions
  const getUserTransactions = useCallback( async () => {
     
    const res = await getTransactionsAll({
      userId : user.id
    })

    if(res.error) throw new Error(res.error)

    setTransactions( res )

  }, [user.id]) 



  // Newly added transaction. Used for adding a 'flash style' when new transaction is added
  // false or number
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
        getUserTransactions={ getUserTransactions }
        setIsNewTransaction={ setIsNewTransaction }
        setTransactions={ setTransactions } 
      />      

      <ViewTransactions 
        getUserTransactions={ getUserTransactions }
        isNewTransaction={ isNewTransaction }
        transactions={ transactions }
      />

      
    </div>
    </>
  )
}