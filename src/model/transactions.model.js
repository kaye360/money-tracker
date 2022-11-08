import { TransactionsAPIURL } from "../config/config";
import { postReqOptions } from "../utils/fetch";


export async function addTransaction({name, amount, budget, userId}) {

  // Check all inputs filled out
  if(!name || !amount || !budget) throw new Error('Please fill out all fields')

  // Check isNan
  if (isNaN( amount ) ) throw new Error('Transaction amount must be a number')

  // Check if disallowed characters


  // fetch
  const addTransactionRes = await fetch(`${TransactionsAPIURL}/add`, postReqOptions({name, amount, budget, userId }))
  if(!addTransactionRes.ok) throw new Error('Error adding Transaction')

  // return json response
  const addTransactionSuccess = await addTransactionRes.json()
  if(addTransactionSuccess.error) throw new Error(addTransactionSuccess.error)
  return addTransactionSuccess
}




export async function editTransaction() {

}




export async function deleteTransaction() {

}




export async function getTransactionsInMonth() {

}




export async function getTransactionsAll() {

}