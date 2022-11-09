import { Style } from 'react-style-tag'
import { useState, useEffect, useContext } from 'react'
import { FlashContext } from '../../App'
import Transaction from './Transaction'


export default function ViewTransactions({ getUserTransactions, isNewTransaction, transactions }) {

  // Get Context
  const setFlash = useContext(FlashContext)[1]



  useEffect( () => {
    try {
      getUserTransactions()
    } catch (error) {
      setFlash({
        type : 'fail',
        message : error.message
      })
    }
  }, [getUserTransactions, setFlash])





  
  return(
    <>
    <Style>
    {`
    `}
    </Style>
    
    <div className='view-transactions my1'>
        <h2>View Transactions</h2>

        {
          transactions.length === 0 && 'You dont\'t have any transactions yet'
        }

        {
          transactions.map( transaction => {
            return(
              <Transaction 
                name={ transaction.name }
                budget={ transaction.budget }
                amount={ transaction.amount }
                date={ transaction.date }
                key={ transaction.transaction_id }
                isNewTransaction = { transaction.transaction_id === isNewTransaction }
                getUserTransactions={ getUserTransactions }
              />
            )
          } )
        }

      </div>
    </>
  )
}