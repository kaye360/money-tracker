import { Style } from 'react-style-tag'

export default function About() {



  return(
    <>
    <Style>
    {`
    .about :where(h1, h2) {
      margin-block : 2rem;
    }

    .about :where( h3, p) {
      margin-block : 1rem;
    }

    `}
    </Style>
    
    <div className='about pb2'>
      <h1>About</h1>

      <p>MoneyApp is an app to keep track of your finances. Here is a little bit of info about the app.</p>

      <h2>Features</h2>

      <h3>Forecast</h3>
      <p>In progress: Here you will be able to see your upcoming bills and paychecks in the next month, laid out day by day.</p>

      <h3>Budgets</h3>
      <p>Manage and set budgets based on your own preferred category system. You can also track your spending on a monthly basis.</p>

      <h3>Transactions</h3>
      <p>Enter new transactions or view all your previous transactions. You can also view on a monthly basis.</p>

      <h3>Savings</h3>
      <p>In progress: Keep track of your savings accounts and watch them grow! Hopefully...</p>

      <h2>How it was made</h2>

      <h3>Front End: React</h3>
      <p>The front end was created using React. I incorporated React-Router-Dom for routing and React-Style-Tag for a better CSS experience. I  created custom hooks such as useBudgets and useTransactions to clean up components and make code re-usable.</p>

      <h4>Back End: PHP/MYSQL</h4>
      <p>The back end is custom API made with PHP and MYSQL. Different custom endpoints were made for each database function. A controller class parses the URL, and then determines which class to require. Then the page is rendered.</p>
    
      <div className='mb2'>
        <a href="https://github.com/kaye360/money-tracker" target="_blank" rel="noreferrer">View the GitHub repo!</a>
      </div>

    
    </div>
    </>
  )
}