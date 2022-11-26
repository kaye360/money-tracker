// 
// Homepage View
// If user is logged in, show dashboard
// If user is not logged in, show landing page
// 

// Dependencies
// import { Style } from 'react-style-tag'
import { useContext } from 'react'
import { UserContext } from '../App'

// Components
import Dashboard from '../components/home/Dashboard'
import Landing from '../components/home/Landing'





export default function Home() {

  // 
  // Get contexts
  // 
  const [ user ] = useContext(UserContext)




  
  return(
    <>
      
    { user ? <Dashboard /> : <Landing /> }

    </>
  )
}