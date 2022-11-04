import { Link } from 'react-router-dom'
import { Style } from 'react-style-tag'
import Logo from './Logo'

export default function SideBar() {

  return(
    <>
    <Style>
    {`
      .Sidebar {
        padding : 1rem;
      }
    `}
    </Style>
    
    <div className='Sidebar'>

      <Logo />

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/budgets">Budgets</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/savings">Savings</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/err">Err</Link></li>
        </ul>
      </nav>
    
    </div>
    </>
  )
}