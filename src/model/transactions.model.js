//
// Transaction Model Functions
// All functions that require GET or POST fetches from DB relating to Transactions
//

// Config
import { TransactionsAPIURL } from "../config/config";

// Utils
import { getData, postReqOptions } from "../utils/fetch";

// 
// Add a new Transaction for a user
// 
// Return { amount, budget, date, name, transaction_id, user_id }
// 
export async function addTransaction({name, amount, budget, userId}) {

  if(!name || !amount || !budget) throw new Error('Please fill out all fields')
  if (isNaN( amount ) ) throw new Error('Transaction amount must be a number')
  // TODO Check if disallowed characters

  return getData({
    url : `${TransactionsAPIURL}/add`,
    fetchOptions : postReqOptions({name, amount, budget, userId })
  })
}

// 
// Edit a users transaction
// 
// Return { amount, budget, date, name, transaction_id, user_id }
// 
export async function editTransaction({ date, name, budget, amount, transactionId }) {

  if(!date || !name  || !budget || !amount) throw new Error('Please fill out all fields')
  if( isNaN(amount) ) throw new Error('Amount must be a number')

  return getData({
    url : `${TransactionsAPIURL}/edit`,
    fetchOptions : postReqOptions({ date, name, budget, amount, transactionId })
  })
}

// 
// Delete a users transaction
// 
// Returns { transaction_id }
// 
export async function deleteTransaction({transactionId}) {

  return getData({
    url : `${TransactionsAPIURL}/delete/${transactionId}`
  })
}

// 
// Get Date range of user transactions
// 
// Return { min, max }
// 
export async function getDateRange({userId}) {

  return getData({
    url : `${TransactionsAPIURL}/getDateRange/${userId}`
  })
}

// 
// Get User transactions for month specified
// 
// Return { amount, budget, date, name, transaction_id, user_id }
// 
export async function getTransactionsInMonth({ userId, month }) {

  return getData({
    url : `${TransactionsAPIURL}/getMonth/${userId}/${month}`
  })
}

// 
// Get All Users transactions
// 
// Return 
// 
export async function getTransactionsAll({ userId }) {

  return getData({
    url : `${TransactionsAPIURL}/getAll/${userId}`
  })
}