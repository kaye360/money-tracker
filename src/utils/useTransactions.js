import { useState, useEffect } from "react";



export default function useTransactions({ userId = false } = {} ) {

  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState(false)


  useEffect( () => {
    ( async () => {

      try {

        // Check if user id is given
        if(!userId) throw new Error('No user specified')

        // Get/Check Transactions\
        const res = await getTransactionsAll({ userId : userId })
        if(res.error) throw new Error(res.error)

        // Set States
        setTransactions( res )
        setError(false)
      } catch (error) {
        
        // Catch and set error
        setError(error.message)
      }

    })({ userId })
  })

}