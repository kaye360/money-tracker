/*
useBudgets Custom Hook
Get User Budgets

Arguments
userId argument is required
month argument is optional, defaults to false

Return Values
Can return [ budgets ], loadBudgets(), or [ error ]

Return Functions
Use loadBudgets() to rerender component after DB is updated with new Values

Examples
   Get User budgets:
   const { budgets } = useBudgets({ userId : 1 }) 

   Get User budgets in a given month with error variable:
   const {budgets, budgetsError} = useBudgets({ userId : 1, month : month.asNumber })

   To Update Flash message:
   useEffect( () => { 
     if(budgetsError) setFlash() 
   }, [budgetsError, setFlash])
*/

// Dependencies
import { useCallback } from "react"
import { useEffect, useState } from "react"

// Utils
import { getBudgets, getMontlySpendingTotals } from "../model/budgets.model"





export default function useBudgets( { userId = false, month = false } = {} ) {
  
  // 
  // Budget State Variables
  // 
  const [budgets, setBudgets] = useState([])
  const [budgetsError, setBudgetsError] = useState(false)

  // 
  // Load budgets from DB
  // 
  const loadBudgets = useCallback( async () => {
    try{
      
      if(!userId) throw new Error('No User Specified')

      const budgetRes = await getBudgets({userId : userId})
      if(budgetRes.error) throw new Error(budgetRes.error)

      if(month) {
        const spentRes = await(getMontlySpendingTotals({ userId : userId, month : month  }))
        if(spentRes.error) throw new Error(spentRes.error)

        budgetRes.forEach( (budget, index) => {
          budgetRes[index].spent = spentRes[budget.name] ? parseInt(spentRes[budget.name]) : 0
        })
      }

      setBudgetsError(false)
      setBudgets(budgetRes)

    } catch (error){

      setBudgetsError (error.message)

    }
  }, [month, userId])

  //
  // Call Loadbudgets on Render
  //
  useEffect( () => {
    loadBudgets()
  }, [ userId, month, loadBudgets])

  //
  // Return { [budgets], loadBudgets(), [budgetsError] }
  //
  return { budgets, loadBudgets, budgetsError }
}

