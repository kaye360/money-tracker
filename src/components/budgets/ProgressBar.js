// 
// Progress bar for amount spent in a given budget during a given month
// 
// cssClassName = camelCase name of current budget
// 

// Dependencies
import { Style } from 'react-style-tag'

export default function ProgressBar({ cssClassName }) {

  return(
    <>
    <Style>
    {`
    `}
    </Style>
    
    <div className='budget-progress-bar-wrapper'>
      <div className={`budget-progress-bar budget-progress-bar-${cssClassName}`}></div>
    </div>
    </>
  )
}