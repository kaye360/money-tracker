import { Style } from 'react-style-tag'
import SignUp from '../components/home/SignUp'
import Login from '../components/home/Login'
import Dashboard from '../components/home/Dashboard'
import { useContext } from 'react'
import { UserContext } from '../App'

export default function Home() {

  const user = useContext(UserContext)[0]

  return(
    <>
    <Style>
    {`

    `}
    </Style>
    
    <div>
      
      <h1>Home</h1>

      {
        user 
          ?<Dashboard />
          : <>
              <Login />
              <SignUp />
            </>
      }

    </div>
    </>
  )
}