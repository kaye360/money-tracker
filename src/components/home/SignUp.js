// 
// User Sign Up Form Component
// 

// Dependencies
import { useContext } from 'react'
import { Style } from 'react-style-tag'
import { FlashContext } from '../../App'

// Utils
import { signUp } from '../../model/users.model'





export default function SignUp() {

  // 
  // Get contexts
  // 
  const [ ,setFlash ] = useContext(FlashContext)

  // 
  // Sign up handler
  // 
  async function handleSignUp(e) {
    e.preventDefault()

    try{

      const res = await signUp({ 
        username : e.target[0].value, 
        password : e.target[1].value, 
        confirmPassword : e.target[2].value 
      })   
      if(res.error) throw new Error(res.error)

      setFlash({ type : 'success', message : `You have succesfully signed up as ${res.username}` }) 

    } catch (error) {
      
      setFlash({ type : 'fail', message : error.message })
    }
  }


  return(
    <>
    <Style>
    {`
      .signUp {
        margin-block : 1rem;
      }

      .signUp label {
        display : block;
      }

      .signup-label {
        display : block;
      }
    `}
    </Style>
    
    <div className='signUp'>

      <h2>Sign Up</h2>

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