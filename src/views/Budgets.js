import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Style } from 'react-style-tag'
import { FlashContext, UserContext } from '../App'
import { add } from '../model/budgets'


export default function Budgets() {

  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]

  const [budgets, setBudgets] = usestate([])

  const navigate = useNavigate()

  useEffect( () => {
    !user && navigate('/req-login')
  }, [navigate, user])


  async function handleAddBudget(e) {
    e.preventDefault()

    try {
      const res = await add({
        'name' : e.target[0].value,
        'amount' : e.target[1].value,
        'userId' : user.id
      })

      if(res.error) throw new Error('Error adding budget')

      setFlash({
        type : 'success',
        message : `Budget ${e.target[0].value} was added successfully`
      })

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