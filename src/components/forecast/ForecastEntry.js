// 
// Single Forecast Entry
// 

// Dependencies
import { Style } from 'react-style-tag'

import iconEdit from '../../assets/img/icon-edit-small.svg'



export default function ForecastEntry({ entry }) {

  return(
    <>
    <Style>
    {`
    `}
    </Style>
    
    <div className={ `forecast-entry forecast-entry-${entry.type}` }>
      <strong>{entry.name}:</strong> &nbsp;
      <span className='forecast-entry-amount'>{entry.amount}</span> &nbsp;
      <button className='forecast-entry-edit'>
        <img src={ iconEdit } alt='Edit Icon' />  
      </button>
    </div>

    </>
  )
}