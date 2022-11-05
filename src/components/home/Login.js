import { useContext, useState } from 'react'
import { Style } from 'react-style-tag'
import { login } from '../../model/users'
import { UserContext } from '../../App'

export default function Login() {

  const [user, setUser] = useContext(UserContext)

  const [loginError, setLoginError] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const res = await login({
        username : e.target[0].value,
        password : e.target[1].value
      })

      if(res.error) throw new Error(res.error)

      // set user to logged in
      setLoginError(false)
      setUser(res[0])
    } catch (error) {
      setLoginError(error.message)
    }
  }


  return(
    <>
    <Style>
    {`
      .login {
        margin-block : 1rem;
      }

      .login label {
        display : block;
      }

      .login-label {
        display : block;
      }
    `}
    </Style>
    
    <div className='login'>

      <h2>Log In</h2>

      {loginError}

      <form onSubmit={ handleLogin } >

        <label>
          <span className='login-label'>Log In</span>
          <input type="text" name="loginUsername" />
        </label>

        <label>
          <span className='login-label'>Password</span>
          <input type="password" name="loginPassword" />
        </label>

        <input type="submit" value="Log In" />

      </form>

    </div>
    </>
  )
}