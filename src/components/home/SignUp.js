import { useState } from 'react'
import { Style } from 'react-style-tag'
import { signUp } from '../../model/users'

export default function SignUp() {

  const [signUpError, setSignUpError] = useState(false)
  

  async function handleSignUp(e) {
    e.preventDefault()

    try{
      const res = await signUp({
        username : e.target[0].value,
        password : e.target[1].value,
        confirmPassword : e.target[2].value
      })   
      setSignUpError(false)
    } catch (error) {
      setSignUpError(error.message)
    }
  }


  return(
    <>
    <Style>
    {`
      .signUp {
        margin-block : 1rem;
      }

      .signup label {
        display : block;
      }

      .signup-label {
        display : block;
      }
    `}
    </Style>
    
    <div className='signUp'>

      <h2>Sign Up</h2>
      {
      signUpError && `Error : ${signUpError}`
      }

      <form onSubmit={ handleSignUp } >

        <label>
          <span className='signup-label'>Username :</span>
          <input type="text" name="signUpUsername" />
        </label>

        <label>
          <span className='signup-label'>Password :</span>
          <input type="password" name="signUpPassword" />
        </label>

        <label>
          <span className='signup-label'>Confirm Password :</span>
          <input type="password" name="confirmPassword" />
        </label>

        <input type="submit" value="Sign Up" />
      </form>

    </div>
    </>
  )
}