import { useContext } from 'react'
import { Style } from 'react-style-tag'
import { FlashContext, UserContext } from '../../App'
import { addBudget } from '../../model/budgets.model'

export default function AddBudget({ loadBudgets, month = false }) {

  // Get Context
  const user = useContext(UserContext)[0]
  const setFlash = useContext(FlashContext)[1]





  // Add budget handler
  async function handleAddBudget(e) {
    e.preventDefault()

    // Format inputs
    const amount = Number(e.target[1].value)
    const name = e.target[0].value

    console.log({amount})

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
      loadBudgets()

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
      }

      .add-budget-form {
        display : flex;
        flex-wrap : wrap;
        align-items : center;
        gap : 1rem;
      }

      .add-budget-input:focus {
        outline-color : var(--clr-primary-3);
      }

      input.add-budget-submit {
        background-color : var(--clr-primary-3);
      }

      input.add-budget-submit:hover {
        background-color : var(--clr-secondary-3);
      }

    `}
    </Style>
    
    <div className='add-budget'>
      <h2>Add a Budget</h2>

      <form onSubmit={ handleAddBudget } >
        <div className="add-budget-form">
          <label>
            <span className="add-budget-label">Budget Name:</span>
            <input type="text" name="budgetName" className='add-budget-input'/>
          </label>

          <label>
            <span className="add-budget-label">Budget Amount:</span>
            <input type="number" name="budgetAmount" step="0.01" className='add-budget-input'/>
          </label>

          <input type="submit" value="Add Budget" className='add-budget-submit' />
        </div>

      </form>
    </div>
    </>
  )
}