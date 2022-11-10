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




export async function deleteTransaction({transactionId}) {
  const deleteTransactionRes = await fetch(`${TransactionsAPIURL}/delete/${transactionId}`)
  if(!deleteTransactionRes.ok) throw new Error('Error deleting transaction')

  const deleteTransactionSuccess = await deleteTransactionRes.json()
  if((deleteTransactionSuccess.error)) throw new Error(deleteTransactionSuccess.error)

  return deleteTransactionSuccess
}




export async function getTransactionsInMonth() {

}




export async function getTransactionsAll({ userId }) {

  // Fetch User transactions
  const getTransactionsRes = await fetch(`${TransactionsAPIURL}/getAll/${userId}`)
  if(!getTransactionsRes.ok) throw new Error('Error fetching User Transactions')

  const getTransactionsSuccess = await getTransactionsRes.json()
  if(getTransactionsSuccess.error) throw new Error(getTransactionsSuccess.error)

  const userTransactions = Object.values(getTransactionsSuccess).map( transaction => {
    return transaction
  } )

  return userTransactions
}