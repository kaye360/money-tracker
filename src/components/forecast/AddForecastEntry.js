// 
// Add Forecast Entry (Bill or Payment)
// 

// Dependencies
import { useState, useContext } from 'react'
import { Style } from 'react-style-tag'
import { UserContext, FlashContext } from '../../App'
import { parseMonth } from '../../utils/date'

// Utils
import { addForecastEntry } from '../../model/forecast.model'





export default function AddForecastEntry() {

  // 
  // Get Contexts
  // 
  const [user] = useContext(UserContext)
  const [ , setFlash] = useContext(FlashContext)
  
  // 
  //Form state values
  // 
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('bill')
  const [repeat, setRepeat] = useState('monthly')
  const [date, setDate] = useState( new Date().toISOString().slice(0,10) )

  // 
  // Add new Forecast entry Handler
  // 
  async function handleFormSubmit(e) {
    e.preventDefault()

    try {

      const res = await addForecastEntry({ name, amount, type, repeat, date, userId : user.id })
      if(res.error) throw new Error(res.error)

      setFlash({ type : 'success', message : `${res.name} added successfully` })

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
      .add-forecast-entry-form {
        display : flex;
        align-items : center;
        gap : 1rem;
        flex-wrap : wrap;
      }

      input.add-forecast-entry-submit {
        background-color : var(--clr-primary-2);
      }
      
      input.add-forecast-entry-submit:hover {
        background-color : var(--clr-secondary-2);
      }
    `}
    </Style>
    
    <form onSubmit={ handleFormSubmit }>
    <div className='add-forecast-entry-form'>
      {date}
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
    </form>
    </>
  )
}