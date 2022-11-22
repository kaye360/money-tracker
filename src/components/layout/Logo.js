// 
// Spendly Logo Component
// 

// Dependencies
import { Link } from 'react-router-dom'
import { Style } from 'react-style-tag'

// Assets
import spendly from '../../assets/img/spendly.svg'





export default function Logo() {

  return(
    <>
    <Style>
    {`
    .Logo {
      display : flex;
      align-items : center;
      gap : 0.5rem;
    }
    `}
    </Style>
    
    <div className='Logo'>
      <Link to='/'>
        <img src={ spendly } alt="Spendly" />
      </Link>
    </div>
    </>
  )
}