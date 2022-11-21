//
// User Model Functions
// All functions that require GET or POST fetches from DB relating to Users
//

// Dependencies
import { postReqOptions } from '../utils/fetch'
import { setLoginSession } from '../utils/localStorage'

// Config
import { UserAPIURL } from '../config/config'

// 
// User Sign Up
//
// Return { username } 
//
export async function signUp({username, password, confirmPassword}) {

  if(!username || !password || !confirmPassword) throw new Error('Please fill out all fields')
  // TODO Check if disallowed characters in username
  if(password !== confirmPassword) throw new Error('Passwords must match')
  if((username.length <= 5) || (password.length <= 5)) throw new Error('Username and Password must be longer than 5 characters')

  const isUsernameTaken = await fetch(`${UserAPIURL}/getUserByUsername/${username}`)
  if (!isUsernameTaken.ok) throw new Error('Error checking username availability')
  const isUsernameTakenResult = await isUsernameTaken.json()
  if(isUsernameTakenResult.username) throw new Error('Username is already taken. Please choose another username')

  const res = await fetch(`${UserAPIURL}/signUp`, postReqOptions({username, password}))
  if(!res.ok) throw new Error('Error with Fetch Sign Up')

  const resJSON = await res.json()
  if(resJSON.error) throw new Error(resJSON.error)
  return resJSON
}

// 
// Log User in 
// Validate and set Token
// 
// returns [ username, userId ]
//
export async function login({username, password}) {

  if (!username || !password) throw new Error('Please fill out all fields')

  const token = Math.random().toString(36).substr(2)

  const res = await fetch(`${UserAPIURL}/login`, postReqOptions({username, password, token}))
  if (!res.ok) throw new Error('Error with fetch Login')
  const resJSON = await res.json()
  
  setLoginSession({ name : resJSON[0], id : resJSON[1], token : token})
  return resJSON
}

// 
// Log user Out
// Clear login token
// 
export async function logout(username) {

  const res = await fetch(`${UserAPIURL}/logout`, postReqOptions({username}))
  if (!res.ok) throw new Error('Error with fetch logout')

}

// 
// Get Login Token from DB
// 
// Return { login_token }
// 
export async function getLoginToken({userId}) {

  const res = await fetch(`${UserAPIURL}/getLoginToken`, postReqOptions({userId : userId}))
  if(!res.ok) throw new Error('Couldn\'t get User token')

  const token = await res.json()
  return token

}

// 
// Get Users Income
// 
// Return { income }
// 
export async function getUserIncome({ userId }) {

  const res = await fetch(`${UserAPIURL}/getUserIncome/${userId}`)
  if (!res.ok) throw new Error('Error with fetching User income')

  const resJSON = await res.json()
  if (resJSON.error) throw new Error(resJSON.error)

  return resJSON
}

// 
// Set Users Income
// 
// Return { income }
// 
export async function setUserIncome({ userId, amount }) {

  const res = await fetch(`${UserAPIURL}/setUserIncome`, postReqOptions({ userId, amount }))
  if(!res.ok) throw new Error('Error with setting User Income')
  return res.json()

}