//
// Monthly Transactions View
// View/manage all transactions in a given month
//

// Dependencies
import { useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { UserContext } from '../App'
import BackLink from '../components/layout/BackLink'

// Components
import Transaction from '../components/transactions/Transaction'
import TransactionsMonthList from '../components/transactions/TransactionsMonthList'

// Utils
import { parseMonth } from '../utils/date'
import useBudgets from '../utils/useBudgets'
import useTransactions from '../utils/useTransactions'





export default function TransactionsMonthly() {

  //
  // Get Context/Params
  //
  const [ user ] = useContext(UserContext)
  const month = parseMonth( useParams().month )

  //
  // Require Login for this page
  //
  const navigate = useNavigate()
  useEffect( () => { !user && navigate('/req-login') }, [navigate, user])

  //  
  // Get users transations in a given month
  //  
  const { transactions, loadTransactions } = useTransactions({ userId : user.id, month : month.asNumber })

  //
  // Get User budgets
  //
  const { budgets } = useBudgets({ userId : user.id })




  
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

      <BackLink path="transactions" title="Transactions" />

      <TransactionsMonthList 
        transactions={ transactions }
        routePath='transactions'
      />

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

                    loadTransactions={ loadTransactions }
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