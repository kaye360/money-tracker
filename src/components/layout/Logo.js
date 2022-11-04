import { Style } from 'react-style-tag'
import logo from '../../assets/img/logo.svg'

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
      <img src={ logo } alt="Logo" />
      <span>MoneyApp</span>
    </div>
    </>
  )
}