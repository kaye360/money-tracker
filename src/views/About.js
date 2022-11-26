// 
// About Page View
// General info about this app for the User
// 

// Dependencies
import { Style } from 'react-style-tag'




export default function About() {



  return(
    <>
    <Style>
    {`

    .about-card-wrapper {
      display : grid;
      grid-auto-columns : minmax(0, 1fr);
      grid-auto-flow : column;
      gap : 2rem;
    }

    .about .btn {
      background-color : var(--clr-primary-2);
      color : var(--clr-primary-5);
    }

    `}
    </Style>
    
    <div className='about px2 py2'>

      <div className='mb2'>
        <h1>About</h1>

        <p>
          Spendly is an app to keep track of your finances. Here is a little bit of info about the app. Currently is is on version <strong>1.0.0</strong>
        </p>
      </div>

      <h2>Features</h2>

      <div className='about-card-wrapper mb2'>
        <div className='about-card'>
          <h3>Budgets</h3>
          <p>Manage and set budgets based on your own preferred category system. You can also track your spending on a monthly basis.</p>
        </div>

        <div className='about-card'>
          <h3>Transactions</h3>
          <p>Enter new transactions or view all your previous transactions. You can also view on a monthly basis.</p>
        </div>

        <div className='about-card'>
          <h3>Coming Soon: Forecast</h3>
          <p> Here you will be able to see your upcoming bills and paychecks in the next month, laid out day by day.</p>
        </div>

        <div className='about-card'>
          <h3>Coming Soon: Savings</h3>
          <p>Keep track of your savings accounts and watch them grow! Hopefully...</p>
        </div>
      </div>

      <h2>How it was made</h2>

      <div className='about-card-wrapper'>
        <div className='about-card'>
          <h3>Front End: React</h3>
          <p>The front end was created using React. I incorporated React-Router-Dom for routing and React-Style-Tag for a better CSS experience. I  created custom hooks such as useBudgets and useTransactions to clean up components and make code re-usable.</p>
        </div>

        <div className='about-card'>
          <h3>Back End: PHP/MYSQL</h3>
          <p>The back end is custom API made with PHP and MYSQL. Different custom endpoints were made for each database function. A controller class parses the URL, and then determines which class to require. Then the page is rendered.</p>
        </div>
      </div>

    
      <div className='my2'>
        <a 
          href="https://github.com/kaye360/money-tracker" 
          target="_blank" 
          className='btn'
          rel="noreferrer"
        >
          View the GitHub repo!
        </a>
      </div>

    
    </div>
    </>
  )
}