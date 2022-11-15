// Update Flash message if needed
// useEffect( () => { 
//   if(error) setFlash({ type : 'fail', message : error }) 
// }, [error, setFlash])


import { useState, useEffect } from "react";
import { getTransactionsAll, getTransactionsInMonth } from "../model/transactions.model";

export default function useTransactions({ userId = false, month = false } = {} ) {
  
  const [transactions, setTransactions] = useState([])
  const [transactionsError, setTransactionsError] = useState(false)



  async function loadTransactions({ userId, month }) {
    try {

      // Check if user id is given
      if(!userId) throw new Error('No user specified')
      
      // Get/Check Transactions\
      // If month param is given, get transactions for that month only. Else get all transactions
      let res
      if(month) {
        res = await getTransactionsInMonth({ userId : userId, month : month })
      } else {
        res = await getTransactionsAll({ userId : userId })
      }

      // Check for errors on response
      if(res.error) throw new Error(res.error)

      // Set States
      setTransactions( res )
      setTransactionsError(false)
    } catch (error) {
      
      // Catch and set error
      setTransactionsError(error.message)
    }
  }



  useEffect( () => {
    loadTransactions({ userId : userId, month : month })
  }, [ userId, month ])



  return { transactions, loadTransactions, transactionsError }
}