import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Style } from 'react-style-tag'
import Logo from './Logo'
import { UserContext } from '../../App'

import sidebarIconBudgets from '../../assets/img/sidebar-icon-budgets.svg'
import sidebarIconTransactions from '../../assets/img/sidebar-icon-transactions.svg'
import sidebarIconSavings from '../../assets/img/sidebar-icon-savings.svg'
import sidebarIconForecast from '../../assets/img/sidebar-icon-forecast.svg'
import sidebarIconAbout from '../../assets/img/sidebar-icon-about.svg'
import sidebarIconUser from '../../assets/img/sidebar-icon-user.svg'
import sidebarIconSignOut from '../../assets/img/sidebar-icon-sign-out.svg'

export default function SideBar() {

  const [user, setUser] = useContext(UserContext)



  return(
    <>
    <Style>
    {`
      .Sidebar {
        position : fixed;
        inset : 0 auto 0 0;
        z-index : 999;

        display : flex;
        flex-direction : column;

        width : 250px;
        height : 100%;
        padding : 1rem;
        background-color : #333;
      }

      .Sidebar :where(a, span) {
        display : flex;
        align-items : center;
        gap : 1rem;

        width : 100%;
        padding : 0.5rem;
        margin-block : 0.5rem;

        border-radius : 0.5rem;
        color : #E7FEF3;
        font-size : 1.2rem;
        text-decoration : none;

        transition : all 150ms ease-in-out;
      }

      .Sidebar a:hover,
      .Sidebar span:hover {
        padding-left : 15px;
        background-color : #222;
      }

      .Sidebar .sec-nav {
        margin-top : auto;
      }

      .Sidebar .sec-nav button {
        background : transparent;
        border : 0;
        outline : 0;
        color : #E7FEF3; 
        font-size : 1.2rem;
      }      
    `}
    </Style>
    
    <div className='Sidebar'>

      <Logo />

      <nav className='main-nav'>
        <ul>
          <li>
            <Link to="/budgets">
              <img src={ sidebarIconBudgets } alt="Budgets" />
              Budgets
            </Link>
          </li>
          <li>
            <Link to="/transactions">
              <img src={ sidebarIconTransactions } alt="Transactions" />
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/savings">
              <img src={ sidebarIconSavings } alt="Savings" />
              Savings
            </Link>
          </li>
          <li>
            <Link to="/forecast">
              <img src={ sidebarIconForecast } alt="Forecast" />
              Forecast
            </Link>
          </li>
          <li>
            <Link to="/about">
              <img src={ sidebarIconAbout } alt="About" />
              About
            </Link>
          </li>
        </ul>
      </nav>

      {
      user &&
        <nav className='sec-nav'>
          <span>
            <img src={ sidebarIconUser } alt="User" />
            {user.name}
          </span>
          <Link to="/" onClick={ () => setUser(false) }>
            <img src={ sidebarIconSignOut } alt="Sign Out" />
            Sign out
          </Link>
        </nav>
      }
    
    </div>
    </>
  )
}