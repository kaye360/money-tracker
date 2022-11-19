import { Style } from 'react-style-tag'

export default function ProgressBar({ cssClassName }) {

  return(
    <>
    <Style>
    {`
    `}
    </Style>
    
    <div className='budget-progress-bar-wrapper mb1'>
      <div className={`budget-progress-bar budget-progress-bar-${cssClassName}`}></div>
    </div>
    </>
  )
}