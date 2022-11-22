/* 
List of months that the user has made transactions in
Used for navigating between mont Views

Paramters:

transactions
  -> List of users transactions

routePath
  -> The view the user is navigating thru. 
  -> Ex: budgets/2022-11 or transactions/2022-04
*/

// Dependencies
import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Style } from 'react-style-tag'
import moment from 'moment/moment'
import { UserContext, FlashContext } from '../../App'

// Utils
import { getDateRange } from '../../model/transactions.model'
import { parseMonth } from '../../utils/date'





export default function TransactionsMonthList({ transactions, routePath }) {

  // 
  // Get contexts/params
  // 
  const [ user ] = useContext(UserContext)
  const [ ,setFlash ] = useContext(FlashContext)
  const currentMonth = parseMonth( useParams().month )

  // 
  // Date Range for all user transactions
  // object { minDate, maxDate } or { error }
  // 
  const [transactionDateRange, setTransactionDateRange] = useState({min : null, max : null})

  //
  // load Date Range from DB or Flash error
  //
  useEffect( () => {
    ( async () => {
      try {

        const dateRange = await getDateRange({ userId : user.id})
        if (dateRange.error) throw new Error(dateRange.error)
        setTransactionDateRange(dateRange)

      } catch (error) {

          setFlash({ type : 'fail', message : error.message })

      }
    })()
  }, [setFlash, user.id, transactions])

  // 
  // transaction month list
  // array of dates ex :("2022-11-09")
  //
  const [transactionMonthList, setTransactionMonthList] = useState([])

  //
  // Calculate transaction month list from users transactions
  //
  useEffect( () => {

    if(!transactionDateRange.min || !transactionDateRange.max) return

    let startDate = moment(transactionDateRange.min)
    let endDate = moment(transactionDateRange.max)
    let dateList = []

    while (startDate.isBefore(endDate)) {
      dateList.push(startDate.format("YYYY-MM-DD"))
      startDate.add(1, 'month')
    }

    setTransactionMonthList(dateList.reverse())
  }, [transactionDateRange.min, transactionDateRange.max])





  return(
    <>
    <Style>
    {`
    .transactions-month-list {
      display : flex;
      flex-wrap : wrap;
      gap : 1rem;
      padding : 0.5rem;
      margin-block : 1rem;
    }


    .transaction-month-list-link,
    .transaction-month-list-link-active {
      display : inline-block;
      padding : 0.5rem 1rem;
      transition : none;
      border : 1px solid #ccc;
    }
    
    .transaction-month-list-link-active {
      background-color : var(--clr-primary-1);
      border-color : var(--clr-primary-3);
    }

    
    .transaction-month-list-link:hover {
      background-color : var(--clr-primary-1);
      border-color : var(--clr-primary-3);
    }

    `}
    </Style>
    
    {
    transactionMonthList.length !== 0 &&
      <div className='transactions-month-list'>
        {
        transactionMonthList.map( (month, index) => {
          month = parseMonth(month)
          return(
            <Link 
              to={`/${routePath}/${month.asNumber}`} 
              className={ `transaction-month-list-link${ currentMonth.asNumber === month.asNumber ? '-active' : '' } fs1` }
              key={ index } 
            >
              { month.asWords } 
            </Link>
          ) 
        })
        }
      </div>
      }

    </>
  )
}