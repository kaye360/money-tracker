import { Style } from 'react-style-tag'
import Dashboard from '../components/home/Dashboard'
import Landing from '../components/home/Landing'
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
      
      {
        user ? <Dashboard /> : <Landing />
      }

    </div>
    </>
  )
}