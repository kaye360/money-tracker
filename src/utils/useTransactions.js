/*
useTransactions Custom Hook
Get Users Transactions

Arguments
userId is required
month is optional, defaults to false

Return Values
Can return [ transactions ], loadTransactions(), or [ transactionsError ]

Return Functions
Use loadTransactions() to rerender component after DB is updated with new values

Examples
  Get User Transactions:
  const { transactions } = useTransactions({ userId : 1 })

  Get User Transactions in a given month with error variable
  const { transactions, transactionsError } = useTransactions({ userId : 1, month : month.asNumber })

  To Update Flash Message:
  useEffect( () => {
    if(transactionsError) setFlash()
  }, [transactionsError, setFlash])
*/

// Dependencies
import { useState, useEffect } from "react";

// Utils
import { getTransactionsAll, getTransactionsInMonth } from "../model/transactions.model";





export default function useTransactions({ userId = false, month = false } = {} ) {
  
  //
  // Transaction State Variables
  //
  const [transactions, setTransactions] = useState([])
  const [transactionsError, setTransactionsError] = useState(false)

  // 
  // Load Transactions from DB
  // 
  async function loadTransactions({ userId, month }) {
    try {

      if(!userId) throw new Error('No user specified')
      
      const res = month
        ? await getTransactionsInMonth({ userId : userId, month : month })
        : await getTransactionsAll({ userId : userId })

      if(res.error) throw new Error(res.error)

      setTransactions( res )
      setTransactionsError(false)

    } catch (error) {
      
      setTransactionsError(error.message)

    }
  }

  //
  // Call loadTransactions on Render
  //
  useEffect( () => {
    loadTransactions({ userId : userId, month : month })
  }, [ userId, month ])

  //
  // Return { [transactions], loadTransactions(), [transactionsError] }
  //
  return { transactions, loadTransactions, transactionsError }
}