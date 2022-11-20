// 
// User Sign up View
// 

// Dependencies
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { FlashContext } from '../App'

// Utils
import { signUp } from '../model/users.model'

// Assets
import signUpBg from '../assets/img/bg-gradient.svg'
import { bg } from '../assets/css/css-variables'





export default function SignUp() {

  // 
  // Get Contexts/hooks
  // 
  const [ ,setFlash ] = useContext(FlashContext)
  const navigate = useNavigate()

  // 
  // Sign Up Handler
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

      setFlash({ 
        type : 'success', 
        message : `You have succesfully signed up as ${e.target[0].value}. You may now log in.` 
      })

      navigate('/sign-in')

    } catch (error) {
      
      setFlash({ type : 'fail', message : error.message })
    }
  }


  // 
  // CSS variables
  // 
  const inlinePadding = '150px'




  
  return(
    <>
    <Style>
    {`
      .Sign-Up {
        position : relative;
        z-index : 1;

        display : grid;
        place-items : center;

        width : 100%;
        min-height : 100vh;

        background-image : url(${ signUpBg });
        background-size : cover;
        background-repeat : no-repeat;
      }

      .Sign-Up h1 {
        padding : 1rem ${ inlinePadding };
      }

      .sign-up-form-wrapper {
        position : relative;
        z-index : 100;
        max-width : 600px;
        width : 100%;
      }

      .sign-up-form {
        position : relative;
        z-index : 100;
        padding : 1rem ${ inlinePadding };
        background-color : hsla(0, 0%, 100%, 0.5);
        border-radius : 1rem;
      }

      .sign-up-form label {
        display : grid;
        grid-template-columns : 1fr;
        gap : 0.5rem;
        margin-block : 2rem;
      }

      .sign-up-form input[type=text],
      .sign-up-form input[type=password] {
        padding : 0.5rem;
        border : 0;
        border-radius : 0.3rem;
        background-color : var(--clr-primary-2);
      }

      .sign-up-form input[type=submit] {
        // background-color : var(--clr-secondary-4);
        border : 2px solid var(--clr-primary-3);
      }

      .sign-up-form-wrapper p {
        position : relative;
        z-index : 100;
        padding-inline : ${ inlinePadding };
      }

      ${ bg }

    `}
    </Style>
    
    <div className='Sign-Up'>
    
      <div className='sign-up-form-wrapper'>

        <h1>Join <span className="font-brand clr-primary">Spendly</span></h1>

        <form onSubmit={ handleSignUp }>
          <div className='sign-up-form'>

            <label>
              Username:
              <input type="text" />
            </label>

            <label>
              Password:
              <input type="password" />
            </label>
            
            <label>
              Confirm Password:
              <input type="password" />
            </label>

            <input type="submit" value="Sign Up" className='btn' />

          </div>
        </form>

        <p className='my2'>Already have an account? <Link to="/sign-in">Sign In</Link></p>

      </div>
     

      <div className='bg-circles'></div>
      <div className='bg-square-dots'></div>



    </div>
    </>
  )
}