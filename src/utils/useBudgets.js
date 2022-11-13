

// How to Use

// Get list of budgets
// Month defaults to false
// const {budgets, error} = useBudgets({ userId : 1, month : month.asNumber })

// If no Flash is needed, just get the budgets property
// const budgets = useBudgets({ userId : 1 }).budgets

// Update Flash message if needed
// useEffect( () => { 
//   if(error) setFlash({ type : 'fail', message : error }) 
// }, [error, setFlash])



import { useEffect, useState } from "react"
import { getBudgets } from "../model/budgets.model"

export default function useBudgets( { userId = false } = {} ) {

  const [budgets, setBudgets] = useState([])
  const [budgetsError, setBudgetsError] = useState(false)



  async function loadBudgets({ userId }) {
    try{
      
      // Check if ID is given
      if(!userId) throw new Error('No User Specified')

      // Get Budget Response
      const budgetRes = await getBudgets({userId : userId})
      if(budgetRes.error) throw new Error(budgetRes.error)

      // Set State
      setBudgetsError(false)
      setBudgets(budgetRes)

    } catch (error){

      // Catch error and set state
      setBudgetsError (error.message)

    }
  }

  
  
  useEffect( () => {
    loadBudgets({userId : userId})
  }, [ userId ])


  
  return { budgets, loadBudgets, budgetsError }
}




// If month is set, append the amount spent that month to each budget object
// if(month) {
//   console.log(month)
//   // Get/Check Monthly spending totals
//   const spentRes = await(getMontlySpendingTotals({ userId : userId, month : month.asNumber  }))
//     console.log('asfdasdf', spentRes)
//     if(spentRes.error) throw new Error(spentRes.error)

//     // Add monthly spending total to budgets array
//     budgetRes.forEach( (budget, index) => {
//       budgetRes[index].spent = spentRes[budget.name] ? parseInt(spentRes[budget.name]) : 0
//     })
// // }

// console.log(budgetRes)