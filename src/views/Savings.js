// 
// Savings View. Coming soon
// 

// Dependencies
import { Style } from 'react-style-tag'
import { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'

import { isSameBiWeeklyDay } from '../utils/date'



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


  // const date = isSameWeeklyDay({
  //   currentDay : "2022-11-23 00:00:00",
  //   compareDay : "2022-11-23 00:00:00"
  // })


  const date = isSameBiWeeklyDay({
    currentDay : "2022-11-23 00:00:00",
    compareDay : "2022-09-20 00:00:00",
    startDay : "2022-08-23 00:00:00"
  })

  console.log(date)
  
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