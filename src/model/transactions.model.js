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




export async function editTransaction({ date, name, budget, amount, transactionId }) {

  // Check all fields filled out
  if(!date || !name  || !budget || !amount) throw new Error('Please fill out all fields')
  if( isNaN(amount) ) throw new Error('Amount must be a number')

  // fetch
  const editTransactionRes = await fetch(`${TransactionsAPIURL}/edit`, postReqOptions({ date, name, budget, amount, transactionId }))
  if(!editTransactionRes.ok) throw new Error('Error editing Transaction')

  // Return json response
  const editTransactionSuccess = await editTransactionRes.json()
  if(editTransactionSuccess.error) throw new Error(editTransactionSuccess.error)

  return editTransactionSuccess
}




export async function deleteTransaction({transactionId}) {
  const deleteTransactionRes = await fetch(`${TransactionsAPIURL}/delete/${transactionId}`)
  if(!deleteTransactionRes.ok) throw new Error('Error deleting transaction')

  const deleteTransactionSuccess = await deleteTransactionRes.json()
  if((deleteTransactionSuccess.error)) throw new Error(deleteTransactionSuccess.error)

  return deleteTransactionSuccess
}





export async function getDateRange(userId) {
  // Fetch User transactions
  const getDateRangeRes = await fetch(`${TransactionsAPIURL}/getDateRange/${userId}`)
  if(!getDateRangeRes.ok) throw new Error('Error fetching Transaction Date Range')

  const getDateRangeSuccess = await getDateRangeRes.json()
  if(getDateRangeSuccess.error) throw new Error(getDateRangeSuccess.error)

  return getDateRangeSuccess
}





export async function getTransactionsInMonth({ userId, month }) {
  // Fetch User transactions
  const getTransactionsRes = await fetch(`${TransactionsAPIURL}/getMonth/${userId}/${month}`)
  if(!getTransactionsRes.ok) throw new Error('Error fetching User Transactions')

  const getTransactionsSuccess = await getTransactionsRes.json()
  if(getTransactionsSuccess.error) throw new Error(getTransactionsSuccess.error)

  const userTransactions = Object.values(getTransactionsSuccess).map( transaction => {
    return transaction
  } )

  return userTransactions
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