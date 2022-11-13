// Update Flash message if needed
// useEffect( () => { 
//   if(error) setFlash({ type : 'fail', message : error }) 
// }, [error, setFlash])


import { useState, useEffect } from "react";
import { getTransactionsAll } from "../model/transactions.model";

export default function useTransactions({ userId = false } = {} ) {
  
  const [transactions, setTransactions] = useState([])
  const [transactionsError, setTransactionsError] = useState(false)



  async function loadTransactions({ userId }) {
    try {

      // Check if user id is given
      if(!userId) throw new Error('No user specified')

      // Get/Check Transactions\
      const res = await getTransactionsAll({ userId : userId })
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
    loadTransactions({ userId : userId })
  }, [ userId ])



  return { transactions, loadTransactions, transactionsError }
}