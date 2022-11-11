import { Style } from 'react-style-tag'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { UserContext, FlashContext } from '../../App'
import { getDateRange } from '../../model/transactions.model'

export default function TransactionsMonthList() {

  // Get context
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]



  // Date Range
  // object { minDate, maxDate } or { error }
  const [transactionDateRange, setTransactionDateRange] = useState({min : null, max : null})
  


  // load Date Range from DB or Flash error
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



  // transaction month list
  const [transactionMonthList, setTransactionMonthList] = useState([])



  // load transaction month list 
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
      border : 1px solid #333;
    }
    `}
    </Style>
    
    {
    transactionMonthList.length !== 0 &&
      <div className='transactions-month-list'>
        {
        transactionMonthList.map( (month, index) => {

          // Parse month
          month = month.split('-').slice(0, 2).join('-')
          let monthInWords = new Date(month).toDateString().split(' ')
          monthInWords = [monthInWords[1], monthInWords[3]].join(' ')

          // Return Link to /transactions/YYYY-MM
          return <Link to={`/transactions/${month}`} key={ index } > { monthInWords } </Link>
        })
        }
      </div>
      }

    </>
  )
}