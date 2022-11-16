import { useContext, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { UserContext } from '../App'
import { parseMonth } from '../utils/date'
import Transaction from '../components/transactions/Transaction'
import TransactionsMonthList from '../components/transactions/TransactionsMonthList'
import useBudgets from '../utils/useBudgets'
import useTransactions from '../utils/useTransactions'

export default function TransactionsMonthly() {



  // Context/Params
  const user = useContext(UserContext)[0]
  const month = parseMonth( useParams().month )



  // Require Login for this page
  const navigate = useNavigate()
  useEffect( () => { !user && navigate('/req-login') }, [navigate, user])


  
  // Get monthly transations
  const { transactions } = useTransactions({ userId : user.id, month : month.asNumber })

  

  // Get User budgets
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

      <div className='my1 px1'>
        <Link to='/transactions'>Back to Transactions</Link>
      </div>

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