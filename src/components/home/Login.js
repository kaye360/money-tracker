import { Style } from 'react-style-tag'

export default function Login() {

  async function handleLogin(e) {
    e.preventDefault()
  }


  return(
    <>
    <Style>
    {`
    `}
    </Style>
    
    <div className='login'>

      <form onSubmit={ handleLogin } >

        <label>
          <span className='login-label'></span>
        </label>

      </form>

    </div>
    </>
  )
}