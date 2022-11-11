import { useContext } from 'react'
import { Style } from 'react-style-tag'
import { FlashContext, UserContext } from '../../App'
import { addBudget } from '../../model/budgets.model'

export default function AddBudget({getUserBudgets}) {

  // Get Context
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]



  // Add budget handler
  async function handleAddBudget(e) {
    e.preventDefault()

    // Format inputs
    const type = e.target[2].value
    const amount = (type === 'paycheck') ? Number(e.target[1].value) * -1 : Number(e.target[1].value)
    const name = e.target[0].value

    // Get Response
    try {
      const res = await addBudget({
        'name' : name,
        'amount' : amount,
        'userId' : user.id
    })

      // Check/Set response
      if(res.error) throw new Error(res.error)
      setFlash({ type : 'success', message : `Budget ${e.target[0].value} was added successfully` })
      getUserBudgets()

    } catch (error) {

      // Flash error message
      setFlash({ type : 'fail', message : error.message })

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

        <label>
          <span className="add-budget-label">Type</span>
          <select>
            <option value="bill">Bill</option>
            <option value="paycheck">Paycheck</option>
          </select>
        </label>

        <div>
          <input type="submit" value="Add Budget" />
        </div>

      </form>
    </div>
    </>
  )
}