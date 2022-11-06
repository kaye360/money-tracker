import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { UserContext } from '../App'


export default function Budgets() {

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
      <h1>Budgets</h1>
    
    </div>
    </>
  )
}