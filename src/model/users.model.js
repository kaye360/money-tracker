import { UserAPIURL } from '../config/config'
import { postReqOptions } from '../utils/fetch'
import { setLoginSession } from '../utils/localStorage'



export async function signUp({username, password, confirmPassword}) {

  // Check all inputs filled out
  if(!username || !password || !confirmPassword) throw new Error('Please fill out all fields')

  // Check if disallowed characters in username

  // Check if passwords match
  if(password !== confirmPassword) throw new Error('Passwords must match')

  // Check min lengths
  if((username.length <= 5) || (password.length <= 5)) throw new Error('Username and Password must be longer than 5 characters')

  // Check if user Exists
  const isUsernameTaken = await fetch(`${UserAPIURL}/getUserByUsername/${username}`)
  if (!isUsernameTaken.ok) throw new Error('Error checking username availability')

  const isUsernameTakenResult = await isUsernameTaken.json()
  if(isUsernameTakenResult.username) throw new Error('Username is already taken. Please choose another username')

  // Fetch
  const signUpRes = await fetch(`${UserAPIURL}/signUp`, postReqOptions({username, password}))
  if(!signUpRes.ok) throw new Error('Error with Fetch Sign Up')

  // Return Response JSON
  const signUpSuccess = await signUpRes.json()
  if(signUpSuccess.error) throw new Error(signUpSuccess.error)
  return signUpSuccess
}





export async function login({username, password}) {

  // Check all inputs filled out
  if (!username || !password) throw new Error('Please fill out all fields')

  // Generate Token
  const token = Math.random().toString(36).substr(2)

  // Fetch
  const loginRes = await fetch(`${UserAPIURL}/login`, postReqOptions({username, password, token}))
  if (!loginRes.ok) throw new Error('Error with fetch Login')
  const loginSuccess = await loginRes.json()
  
  // Set Token
  setLoginSession({ user : loginSuccess[0], id : loginSuccess[1], token : token})

  // Return success or fail
  return loginSuccess
}





export async function logout(username) {

  const res = await fetch(`${UserAPIURL}/logout`, postReqOptions({username}))
  if (!res.ok) throw new Error('Error with fetch logout')

}





export async function getUserIncome({ userId }) {

  // Fetch Data
  const getIncomeRes = await fetch(`${UserAPIURL}/getUserIncome/${userId}`)
  if (!getIncomeRes.ok) throw new Error('Error with fetching User income')

  // Check for error
  const getIncomeSuccess = await getIncomeRes.json()
  if (getIncomeSuccess.error) throw new Error(getIncomeSuccess.error)

  // Return Success or fail 
  return getIncomeSuccess
}





export async function setUserIncome({ userId, amount }) {

  // Fetch call
  const setUserIncomeRes = await fetch(`${UserAPIURL}/setUserIncome`, postReqOptions({ userId, amount }))
  if(!setUserIncomeRes.ok) throw new Error('Error with setting User Income')

  // Return json response
  return setUserIncomeRes.json()

}