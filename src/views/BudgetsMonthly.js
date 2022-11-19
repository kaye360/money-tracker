import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { UserContext } from '../App'

import AddBudget from '../components/budgets/AddBudget'
import ViewBudget from '../components/budgets/ViewBudget'
import Transaction from '../components/transactions/Transaction'
import TransactionsMonthList from '../components/transactions/TransactionsMonthList'

import { parseMonth } from '../utils/date'
import useBudgets from '../utils/useBudgets'
import useTransactions from '../utils/useTransactions'

export default function BudgetsMonthly() {



  // Context/Params
  const [ user ] = useContext(UserContext)
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
  const { transactions, loadTransactions } = useTransactions({ userId: user.id, month: month.asNumber })



  // Users Transactions without an active budget (previously deleted)
  const transactionsWithoutBudget = transactions.filter( transaction => {

    // Check if transaction.budget is in budgets[#].name
    return !budgets.some( budget => {
      return budget.name === transaction.budget
    } )

  } )


  
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

      .budgets-monthly-transactions-table {
        width : 100%;
      }
    `}
    </Style>
    
    <div className='budgets py2'>
      <h1 className='px1'>
        Budgets
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

      {
        transactionsWithoutBudget.length !== 0 &&
          <div className='my2'>
            <h3>UnBudgeted Transactions This Month</h3>

            <table className='budgets-monthly-transactions-table'>
              {
                transactionsWithoutBudget.map( (transaction, index) => {
                  return( 
                    <Transaction
                      name={ transaction.name }
                      budget={ transaction.budget }
                      amount={ transaction.amount }
                      date={ transaction.date }
                      transactionId={ transaction.transaction_id }
                      isNewTransaction={ false }
                      loadTransactions={ loadTransactions }
                      budgets={ budgets }
                      key={ transaction.transaction_id }
                    />
                  )
                } )
              }
            </table>
          </div>
      }

      <AddBudget
        loadBudgets={ loadBudgets }
      />
    
    </div>
    </>
  )
}