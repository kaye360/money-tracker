import { Style } from 'react-style-tag'
import { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'

export default function Savings() {

  const user = useContext(UserContext)[0]

  const navigate = useNavigate()

  useEffect( () => {
    !user && navigate('/req-login')
  }, [navigate, user])

  return(
    <>
    <Style>
    {`
    `}
    </Style>
    
    <div>
      <h1>Savings</h1>
    
    </div>
    </>
  )
}