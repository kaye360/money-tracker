// 
// Add Forecast Entry (Bill or Payment)
// 

// Dependencies
import { useState, useContext } from 'react'
import { Style } from 'react-style-tag'
import { UserContext, FlashContext } from '../../App'

// Utils
import { addForecastEntry } from '../../model/forecast.model'

// Assets
import iconAdd from '../../assets/img/icon-add-calendar.svg'



export default function AddForecastEntry({ loadForecastEntries }) {

  // 
  // Get Contexts/Hooks
  // 
  const [user] = useContext(UserContext)
  const [ , setFlash] = useContext(FlashContext)
  
  // 
  // Form state values
  // 
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('bill')
  const [repeat, setRepeat] = useState('monthly')
  const [date, setDate] = useState( new Date().toISOString().slice(0,10) )

  // 
  // Form is shown or not
  // 
  const [isFormShown, setIsFormShown] = useState(false)

  // 
  // Add new Forecast entry Handler
  // 
  async function handleFormSubmit(e) {
    e.preventDefault()

    try {

      const res = await addForecastEntry({ name, amount, type, repeat, date, userId : user.id })
      if(res.error) throw new Error(res.error)

      setIsFormShown(false)
      setFlash({ type : 'success', message : `${res.name} added successfully` })
      loadForecastEntries({ userId : user.id })

    } catch(error) {
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
      .add-forecast-heading {
        display : flex;
        align-items : center;
        gap : 0.5rem;
      }

      .add-forecast-entry-form {
        display : grid;
        grid-template-columns : 1fr 1fr;
        max-width : 750px;
        margin-bottom : 1rem;
      }

      .add-forecast-entry-form label {
        display : block;
        margin-block : 1rem;
      }

      input.add-forecast-entry-submit {

        background-color : var(--clr-primary-2);
      }
      
      input.add-forecast-entry-submit:hover {
        background-color : var(--clr-secondary-2);
      }
    `}
    </Style>
    
    <div className='add-forecast-heading'>
      <h2>Add an Entry</h2>
      <button onClick={ () => setIsFormShown(!isFormShown) } className='my0 py0'>
        <img src={ iconAdd } alt="Add an Entry" />
      </button>
    </div>

    {
    isFormShown &&
      <form onSubmit={ handleFormSubmit }>
      <div className='add-forecast-entry-form'>
        
        <div className='add-forecast-entry-form-column'>

          <label>
            Name:
            <input 
              type="text" 
              defaultValue={ name } 
              onChange={ (e) => setName(e.target.value) } 
            />
          </label>

          <label>
            Amount
            <input 
              type="number" 
              step="0.01" 
              defaultValue={ amount }
              onChange={ (e) => setAmount(e.target.value) }   
            />
          </label>

          <label>
            Starting Date
            <input
              type="date" 
              defaultValue={ date }
              onChange={ (e) => setDate(e.target.value) }
            />
          </label>

        </div>

        <div className='add-forecast-entry-form-column'>

          <label>
            Type
            <select 
              defaultValue={ type }
              onChange={ (e) => setType(e.target.value) }   
            >
              <option value="bill">Bill</option>
              <option value="paycheck">Paycheck</option>
            </select>
          </label>

          <label>
            Repeat
            <select 
              defaultValue={ repeat }
              onChange={ (e) => setRepeat(e.target.value) }   
            >
              <option value="monthly">Monthly</option>
              <option value="bimonthly">Bi-Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-Weekly</option>
            </select>
          </label>
        
          <input 
            type="submit" 
            value={ `Add Recurring ${ type[0].toUpperCase() + type.slice(1) }` }
            className='add-forecast-entry-submit' 
          />
        </div>

      </div>
      </form>
    }
    </>
  )
}