import { Link, useNavigate } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { useContext } from 'react'
import { FlashContext, UserContext } from '../App'
import { login } from '../model/users.model'
import signInBg from '../assets/img/bg-gradient.svg'
import { bg } from '../assets/css/css-variables'


export default function SignIn() {

  const setUser = useContext(UserContext)[1]
  const setFlash = useContext(FlashContext)[1]

  const navigate = useNavigate()


  async function handleLogin(e) {
    e.preventDefault()

    try {

      // Get/Check response
      const res = await login({ username : e.target[0].value, password : e.target[1].value })
      if(res.error) throw new Error(res.error)

      // set user to logged in
      setUser({ 'name' : res[0], 'id' : res[1] })

      // Success message and redirect to dashboard
      setFlash({ type : 'success', message : `You are now logged in as ${res[0]}` })
      navigate("/")

    } catch (error) {
      
      setFlash({ type : 'fail', message : error.message })
      
    }
  }



  // CSS variables

  const inlinePadding = '150px'

  return(
    <>
    <Style>
    {`
      .Sign-In {
        position : relative;
        z-index : 1;

        display : grid;
        place-items : center;

        width : 100%;
        min-height : 100vh;

        background-image : url(${ signInBg });
        background-size : cover;
        background-repeat : no-repeat;
      }

      .Sign-In h1 {
        padding : 1rem ${ inlinePadding };
      }

      .sign-in-form-wrapper {
        position : relative;
        z-index : 100;
        max-width : 600px;
        width : 100%;
      }

      .sign-in-form {
        position : relative;
        z-index : 100;
        padding : 1rem ${ inlinePadding };
        background-color : hsla(0, 0%, 100%, 0.5);
        border-radius : 1rem;
      }

      .sign-in-form label {
        display : grid;
        grid-template-columns : 1fr;
        gap : 0.5rem;
        margin-block : 2rem;
      }

      .sign-in-form input[type=text],
      .sign-in-form input[type=password] {
        padding : 0.5rem;
        border : 0;
        border-radius : 0.3rem;
        background-color : var(--clr-primary-2);
      }

      .sign-in-form input[type=submit] {
        border : 2px solid var(--clr-primary-3);
      }

      .sign-in-form-wrapper p {
        position : relative;
        z-index : 100;
        padding-inline : ${ inlinePadding };
      }

      ${ bg }

    `}
    </Style>
    
    <div className='Sign-In'>
    
      <div className='sign-in-form-wrapper'>

        <h1>Sign in to  <span className="font-brand clr-primary">Spendly</span></h1>

        <form onSubmit={ handleLogin } >
          <div className='sign-in-form'>

            <label>
              Username:
              <input type="text" />
            </label>

            <label>
              Password:
              <input type="password" />
            </label>

            <input type="submit" value="Sign In" className='btn' />

          </div>
        </form>

        <p className='my2'>Don't have an account? <Link to="/sign-up">Join Today</Link></p>

      </div>
     

      <div className='bg-circles'></div>
      <div className='bg-square-dots'></div>



    </div>
    </>
  )
}