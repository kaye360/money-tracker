import { Style } from 'react-style-tag'
import SignUp from '../components/home/SignUp'
import Login from '../components/home/Login'

export default function Home({setUser}) {

  return(
    <>
    <Style>
    {`

    `}
    </Style>
    
    <div>
      <h1>Home</h1>

      <Login setUser={ setUser } />

      <SignUp />
    
    </div>
    </>
  )
}