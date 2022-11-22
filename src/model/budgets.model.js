// 
// Budgets Model
// All functions that require GET or POST fetches from DB relating to Budgets
// 

// Config
import { BudgetAPIURL } from '../config/config'

// Utils
import { postReqOptions, getData } from '../utils/fetch'

// 
// Add a Users budget
// 
// Return list of budgets, key/value { budgetName : amount }
// 
export async function addBudget({ name, amount, userId }) {

  if(!name || !amount) throw new Error('Please fill out all fields')
  // TODO Check isNan
  // TODO Check if disallowd characters

  return  getData({
    url : `${BudgetAPIURL}/add`,
    fetchOptions : postReqOptions({name, amount, userId})
  })
} 

// 
// Edit a User Budget
// 
// Return updated list of budgets { budgetName : amount }
// 
export async function editBudget({ userId, newName, newAmount, oldName }) {

  return getData({
    url : `${BudgetAPIURL}/edit`,
    fetchOptions : postReqOptions({userId, newName, newAmount, oldName})
  })
} 

// 
// Get list of users budgets
//
// Return array sorted by $ amount, hi to lo [ { name, amount } ]
// 
export async function getBudgets({ userId }) {

  const res = await getData({ url : `${BudgetAPIURL}/get/${userId}` })
  const userBudgets = Object.entries(res).map(budget => {
    return { 'name' : budget[0], 'amount' : parseFloat(budget[1]) }
  })

  return userBudgets.sort( (a,b) => {
    if(Number(a.amount) === Number(b.amount)) return 0
    return Number(a.amount) > Number(b.amount) ? -1 : 1;
  })
} 

// 
// Get Monthly spending totals for each of Users budgets
// 
// Returns list of budgets as obj { budgetName : totalSpent }
// 
export async function getMontlySpendingTotals({ userId, month }) {
  
  return getData({
    url : `${BudgetAPIURL}/getMonthlySpendingTotals/${userId}/${month}`
  })
} 

// 
// Delete a Users budget
// 
// Returns list of updated budgets as obj { budgetName, totalSpent }
// 
export async function deleteBudget({ userId, budgetName }) {

  return getData({
    url : `${BudgetAPIURL}/delete/`,
    fetchOptions : postReqOptions({ userId, budgetName })
  })
} 




