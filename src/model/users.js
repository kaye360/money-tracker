import { UserModelURL } from '../config/config'
import { postReqOptions } from '../utils/fetch'

export async function signUp({username, password, confirmPassword}) {

  // Check all forms filled out
  if(!username || !password || !confirmPassword) throw new Error('Please fill out all fields')

  // Check if disallowed characters in username

  // Check if passwords match
  if(password !== confirmPassword) throw new Error('Passwords must match')

  // Check min lengths
  if((username.length <= 5) || (password.length <= 5)) throw new Error('Username and Password must be longer than 5 characters')

  // Check if user Exists

  // Fetch
  const signUpRes = await fetch(`${UserModelURL}/signUp`, postReqOptions({username, password}))
  if(!signUpRes.ok) throw new Error('Error with Fetch function')

  // Return Response JSON
  const signUpSuccess = await signUpRes.json()
  if(signUpSuccess.error) throw new Error(signUpSuccess.error)
  return signUpSuccess
}