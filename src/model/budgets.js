import { BudgetModelURL } from '../config/config'
import { postReqOptions } from '../utils/fetch'


export async function add({ name, amount, userId }) {

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





export async function edit({ id, name, amount }) {
  console.log(id, name, amount)
} 





export async function get({ userId }) {
  console.log(userId)
} 





export async function remove({ budgetId }) {
  console.log(budgetId)
} 




