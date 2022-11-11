import { useContext, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { UserContext, FlashContext } from '../App'
import { parseMonth } from '../utils/date'
import Transaction from '../components/transactions/Transaction'
import { getTransactionsInMonth } from '../model/transactions.model'
import { getBudgets } from '../model/budgets.model'
import { useState } from 'react'
import TransactionsMonthList from '../components/transactions/TransactionsMonthList'

export default function TransactionsInMonth() {



  // Context/Params
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]
  const month = parseMonth( useParams().month )



  // Require Login for this page
  const navigate = useNavigate()

  useEffect( () => { !user && navigate('/req-login') }, [navigate, user])


  // Users transactions in one month
  const [transactions, setTransactions] = useState([])



  // Get user transactions for 1 month
  const getUserTransactionsInMonth = useCallback( async () => {

    try {

      // Get/Check/Set Transactions, set state  
      const res = await getTransactionsInMonth({ userId : user.id, month : month.asNumber })
      if(res.error) throw new Error(res.error)
      setTransactions( res )
      
    } catch (error) {

      // Flash error message
      setFlash({ type : 'fail', message : error.message })

    }

  }, [setFlash, month.asNumber, user.id]) 
  


  // load Transactions
  useEffect( () => {
    try {
      getUserTransactionsInMonth()
    } catch (error) {
      setFlash({ type : 'fail', message : error.message })
    }
  }, [getUserTransactionsInMonth, setFlash])



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



  // load Budgets
  useEffect( () => { 
    try { getUserBudgets() } catch(error) {} }, [getUserBudgets]
  )


  return(
    <>
    <Style>
    {`
      .transactions-table {
        width : 100%;
      }

      .transactions-table td {
        min-width : 100px;
        padding : 0.5rem 0.4rem;
      }

      .transactions-table tr:nth-child(2n) {
        background-color : #f4f4f4;
      }

      .transactions-table-head {
        background-color : #f0f0f0;
      }

      .transactions-table input:not([type=submit]) {
        width : 100px;
      }
    `}
    </Style>
    
    <div>
      <h1>Transactions - { month.asWords }</h1>

      <div className='my1 px1'>
        <Link to='/transactions'>Back to Transactions</Link>
      </div>

      <TransactionsMonthList />

      <table className='transactions-table'>

        <thead>
          <tr className='transaction-grid-row transactions-table-head'>

            <td>Date</td>
            <td>Name</td>
            <td>Budget</td>
            <td>Amount</td>
            <td>Action</td>

          </tr>
        </thead>

        <tbody>

          {
            transactions.map( transaction => {
              return(
                <Transaction 
                    name={ transaction.name }
                    budget={ transaction.budget }
                    amount={ transaction.amount }
                    date={ transaction.date }
                    transactionId={ transaction.transaction_id }
                    key={ transaction.transaction_id }

                    getUserTransactions={ getUserTransactionsInMonth }
                    budgets={ budgets }
                    />
                    )
                  } )
          }
        </tbody>
      </table>

      {
        transactions.length === 0 && 
        <div className='my2 text-center'>
          You dont't have any transactions yet
        </div>
      }

    
    </div>
    </>
  )
}