import { useCallback } from 'react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { FlashContext, UserContext } from '../App'
import AddBudget from '../components/budgets/AddBudget'

import ViewBudget from '../components/budgets/ViewBudget'
import { getBudgets } from '../model/budgets.model'


export default function Budgets() {

  // Get context 
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]



  
  // Require Login for this page
  const navigate = useNavigate()

  useEffect( () => {
    !user && navigate('/req-login')
  }, [navigate, user])
  



  // Get User Budgets
  const getUserBudgets = useCallback( async () => {

    try {
      const res = await getBudgets({
        'userId' : user.id
      })
      
      if(res.error) throw new Error(res.error)
    
      setBudgets( res )
      
    } catch (error) {
      setFlash({
        type : 'fail',
        message : error.message
      })
    }
  }, [user.id, setFlash])


  

  // Users Budgets
  // Array of objects {name, amount} or false
  const [budgets, setBudgets] = useState([])
  
  useEffect( () => {
    try {
      getUserBudgets()
    } catch(error) {
      setFlash({
        type : 'fail',
        message : error.message
      })
    }
  }, [getUserBudgets, setFlash])




  // Total amount of all Budgets. Number
  function  totalBudgetsAmount(total=0) {
    budgets.forEach( (budget) => total += Number(budget.amount) )
    return total
  }
  


  


  
  return(
    <>
    <Style>
    {`
      .budgets h1 {
        display : flex;
        justify-content : space-between;
        align-items : flex-end;
        width : 100%;
      }

      .budgets h1 span {
        font-size : 1.2rem;
      }
    `}
    </Style>
    
    <div className='budgets'>
      <h1 className='px1'>
        Budgets 
        <span className='budgets-total-amount'>Total ${ totalBudgetsAmount() }/month</span>
      </h1>

      <ViewBudget 
        budgets={ budgets }
        getUserBudgets={ getUserBudgets }
      />

      <AddBudget
        getUserBudgets={ getUserBudgets }
      />
    
    </div>
    </>
  )
}