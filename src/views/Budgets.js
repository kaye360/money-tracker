import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { FlashContext, UserContext } from '../App'
import { addBudget, getBudgets, editBudget, removeBudget } from '../model/budgets'


export default function Budgets() {

  // Get context 
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]



  // Require Login for this page
  const navigate = useNavigate()

  useEffect( () => {
    !user && navigate('/req-login')
  }, [navigate, user])
  
  

  // Array of objects {name, amount} or false
  const [budgets, setBudgets] = useState([])
  
  useEffect( () => {
    try {
      getUserBudgets()
    } catch(error) {
      setFlash({
        type : 'fail',
        message : error
      })
    }
  }, [])
  

  
  // Get User Budgets
  async function getUserBudgets() {
    const res = await getBudgets({
      'userId' : user.id
    })
    
    if(res.error) throw new Error(res.error)

    const budgets = Object.entries(res).map(budget => {
      return { 'name' : budget[0], 'amount' : budget[1] }
    })

    setBudgets( budgets )
  }



  // Add budget handler
  async function handleAddBudget(e) {
    e.preventDefault()

    try {
      const res = await addBudget({
        'name' : e.target[0].value,
        'amount' : e.target[1].value,
        'userId' : user.id
      })

      if(res.error) throw new Error('Error adding budget')

      setFlash({
        type : 'success',
        message : `Budget ${e.target[0].value} was added successfully`
      })

      getUserBudgets()

    } catch (error) {
      setFlash({
        type : 'fail',
        message : error.message
      })
    }

  }

  return(
    <>
    <Style>
    {`
      .view-budgets {
        padding : 1rem;
        border : 1px solid #333;
      }

      .add-budget {
        padding : 1rem;
        border : 1px solid #333;
      }

      .add-budget label {
        display : block;
      }

      .add-budget-label {
        display : block;
      }
    `}
    </Style>
    
    <div>
      <h1>Budgets</h1>

      <div className='view-budgets my2'>
        <h2>Budgets</h2>

        {
          !budgets && 'You haven\'t added any budgets yet'
        }

        {
          budgets.map( (budget) => {
            return(
              <div key={ budget.name }>
                { budget.name } : { budget.amount }
              </div>
            )
          })
        }


      </div>

      <div className='add-budget'>
        <h2>Add a Budget</h2>

        <form onSubmit={ handleAddBudget } >

          <label>
            <span className="add-budget-label">Budget Name:</span>
            <input type="text" name="budgetName" />
          </label>

          <label>
            <span className="add-budget-label">Budget Amount:</span>
            <input type="text" name="budgetAmount" />
          </label>

          <div>
            <input type="submit" value="Add Budget" />
          </div>

        </form>


      </div>
    
    </div>
    </>
  )
}