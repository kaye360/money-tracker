// 
// Single Forecast Entry
// 

// Dependencies
import { useState, useContext } from 'react'
import { Style } from 'react-style-tag'
import { FlashContext, UserContext } from '../../App'

// Utils
import { editForecastEntry } from '../../model/forecast.model'

// Assets
import iconEdit from '../../assets/img/icon-edit-small.svg'
import iconSave from '../../assets/img/icon-save.svg'



export default function ForecastEntry({ entry, loadForecastEntries }) {
  console.log(entry)
  // 
  // Get contexts
  // 
  const [user] = useContext(UserContext)
  const [ , setFlash] = useContext(FlashContext)

  // 
  // Entry is in editmode or not
  // 
  const [isEditMode, setIsEditMode] = useState(false)

  // 
  // Edit form variables
  // 
  const [name, setName] = useState(entry.name)
  const [amount, setAmount] = useState(entry.amount)
  const [type, setType] = useState(entry.type)
  const [repeatAmount, setRepeatAmount] = useState(entry.repeat_amount)
  const [startingDate, setStartingDate] = useState( entry.starting_date.split(' ').slice(0, 1).toString() )

  // 
  // Edit form submit handler
  // 
  async function handleSubmit(e) {
    e.preventDefault()
    
    try {

      const res = await editForecastEntry( {entry : {
        name, amount, type, repeatAmount, startingDate, 
        userId : user.id,
        forecastEntryId : entry.forecast_id
      }})

      if (res.error) throw new Error(res.error)
      setIsEditMode(false)
      setFlash({ type : 'success', message : `Successfully saved ${res.name}` })
      loadForecastEntries({ userId : user.id })
      
    } catch (error) {

      setFlash({ type : 'fail', message : error.message})

    }

  }

  return(
    <>
    <Style>
    {`
    `}
    </Style>
    
    <div className={ `forecast-entry forecast-entry-${type}` }>

      {
      isEditMode ? 
      <>
      <form onSubmit={ handleSubmit }>
      <div className='forecast-entry-form'>
        
        <input 
          type="text" 
          defaultValue={ name }
          onChange={ (e) => setName(e.target.value) }
        />

        <input
          type="number"
          step="0.01"
          defaultValue={ amount }
          onChange={ (e) => setAmount(e.target.value) }
        />

        <select defaultValue={ type } onChange={ (e) => setType(e.target.value) }>
          <option value="bill">Bill</option>
          <option value="paycheck">Paycheck</option>
        </select>

        <select defaultValue={ repeatAmount } onChange={ (e) => setRepeatAmount(e.target.value) }>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="bimonthly">Bi-Monthly</option>
        </select>

        <input type="date" defaultValue={ startingDate } onChange={ (e) => setStartingDate(e.target.value) }/>
        <button type="submit">
          <img src={ iconSave } alt="Save" />
        </button>

      </div>  
      </form>
      </>
      : // isEditMode = false
      <>
        <strong>{name}:</strong> &nbsp;
        <span className='forecast-entry-amount'>{amount}</span> &nbsp;
        <button onClick={ () => setIsEditMode(true) } className='forecast-entry-edit'>
          <img src={ iconEdit } alt='Edit Icon' />  
        </button>
      </>
      }

    </div>

    </>
  )
}