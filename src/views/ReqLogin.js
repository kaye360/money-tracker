import { Style } from 'react-style-tag'
import { Link } from 'react-router-dom'

export default function ReqLogin() {

  return(
    <>
    <Style>
    {`
      .login-required {
        // display : grid;
        // place-items : center;
        min-height : 100vh;
      }

      .login-required-wrapper {
        width : 100%;
        background-color : var(--clr-primary-1);
        border-radius : 1rem;
      }
      
      button.login-required-button {
        background-color : var(--clr-primary-3);
        color : #000;
      }
    `}
    </Style>
    
    <div className='login-required px2 py2'>

      <div className='login-required-wrapper px3 py3'>
        <h1>Login Required</h1>

        <p className='py1 fs2'>
          You must be logged in to view this page.
        </p>
        <p>
          <Link to="/sign-in">
            <button className='login-required-button fs2'>Sign in</button>
          </Link>
        </p>
      </div>
    
    </div>
    </>
  )
}