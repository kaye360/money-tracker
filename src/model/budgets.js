import { BudgetModelURL } from '../config/config'
import { postReqOptions } from '../utils/fetch'


export async function addBudget({ name, amount, userId }) {

  // Check all inputs filled out
  if(!name || !amount) throw new Error('Please fill out all fields')

  // Check if disallowded characters, amount is a number

  // fetch
  const addBudgetRes = await fetch(`${BudgetModelURL}/add`, postReqOptions({name, amount, userId}))
  if(!addBudgetRes.ok) throw new Error('Error adding budget')

  // return response json
  const addBudgetSuccess = await addBudgetRes.json()
  if(addBudgetSuccess.error) throw new Error(addBudgetSuccess.error)
  return addBudgetSuccess
} 





export async function editBudget({ id, name, amount }) {
  console.log(id, name, amount)
} 





export async function getBudgets({ userId }) {

  // Fetch user budgets
  const getBudgetsRes = await fetch(`${BudgetModelURL}/get/${userId}`)
  if(!getBudgetsRes.ok) throw new Error('Error fetching User Budgets')

  const getBudgetsSuccess = await getBudgetsRes.json()
  if(getBudgetsSuccess.error) throw new Error(getBudgetsSuccess.error)

  const userBudgets = Object.entries(getBudgetsSuccess).map(budget => {
    return { 'name' : budget[0], 'amount' : budget[1] }
  })
  return userBudgets
} 





export async function deleteBudget({ userId, budgetName }) {

  // Fetch delete budget
  const deleteBudgetRes = await fetch(`${BudgetModelURL}/delete/${ userId }:${ budgetName }`)
  if(!deleteBudgetRes.ok) throw new Error('Error fetching Delete function')

  const deleteBudgetSuccess = await deleteBudgetRes.json()
  if(deleteBudgetSuccess.error) throw new Error(deleteBudgetSuccess.error)

  return deleteBudgetSuccess
} 




