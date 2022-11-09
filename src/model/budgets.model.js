import { BudgetAPIURL } from '../config/config'
import { postReqOptions } from '../utils/fetch'


export async function addBudget({ name, amount, userId }) {

  // Check all inputs filled out
  if(!name || !amount) throw new Error('Please fill out all fields')

  // Check isNan

  // Check if disallowded characters, amount is a number

  // fetch
  const addBudgetRes = await fetch(`${BudgetAPIURL}/add`, postReqOptions({name, amount, userId}))
  if(!addBudgetRes.ok) throw new Error('Error adding budget')

  // return response json
  const addBudgetSuccess = await addBudgetRes.json()
  if(addBudgetSuccess.error) throw new Error(addBudgetSuccess.error)
  return addBudgetSuccess
} 





export async function editBudget({ userId, newName, newAmount, oldName }) {

  const editBudgetRes = await fetch(`${BudgetAPIURL}/edit`, postReqOptions({userId, newName, newAmount, oldName}))
  if(!editBudgetRes.ok) throw new Error('Error editing budget')

  const editBudgetSuccess = await editBudgetRes.json()
  if(editBudgetSuccess.error) throw new Error(editBudgetSuccess.error)

  return editBudgetSuccess
} 





export async function getBudgets({ userId }) {

  // Fetch user budgets
  const getBudgetsRes = await fetch(`${BudgetAPIURL}/get/${userId}`)
  if(!getBudgetsRes.ok) throw new Error('Error fetching User Budgets')

  const getBudgetsSuccess = await getBudgetsRes.json()
  if(getBudgetsSuccess.error) throw new Error(getBudgetsSuccess.error)

  const userBudgets = Object.entries(getBudgetsSuccess).map(budget => {
    return { 'name' : budget[0], 'amount' : budget[1] }
  })

  return userBudgets.sort( (a,b) => {
    if(Number(a.amount) === Number(b.amount)) return 0
    return Number(a.amount) > Number(b.amount) ? -1 : 1;
  })
} 





export async function deleteBudget({ userId, budgetName }) {

  // Fetch delete budget
  const deleteBudgetRes = await fetch(`${BudgetAPIURL}/delete/${ userId }:${ budgetName }`)
  if(!deleteBudgetRes.ok) throw new Error('Error fetching Delete function')

  const deleteBudgetSuccess = await deleteBudgetRes.json()
  if(deleteBudgetSuccess.error) throw new Error(deleteBudgetSuccess.error)

  return deleteBudgetSuccess
} 




