// 
// Savings View. Coming soon
// 

// Dependencies
import { Style } from 'react-style-tag'
import { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'



export default function Savings() {

  // 
  // Get Contexts
  // 
  const [ user ] = useContext(UserContext)
  const navigate = useNavigate()

  // 
  // Require login for this page
  // 
  useEffect( () => { !user && navigate('/req-login') }, [navigate, user])


    
  return(
    <>
    <Style>
    {`
    `}
    </Style>
    
    <div>
      <h1>Savings</h1>


      <p className='my2'>Coming soon in the next version!</p> 
    
    </div>
    </>
  )
}