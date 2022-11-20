// 
// Spendly: A monney tracking web app
// Made by Josh Kaye
// Check out my web dev portfolio at https://joshkaye.ca
// 
// Any commnets, tips, or suggestions are welcome!
// 

// Dependencies
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Style } from "react-style-tag";
import { createContext, useEffect, useState } from "react";
import { getLoginSession, endLoginSession } from "./utils/localStorage";
import { getLoginToken, logout } from "./model/users.model";

// Layout
import SideBar from "./components/layout/SideBar";
import Footer from "./components/layout/Footer"
import Flash from "./components/layout/Flash";

// Views
import Home from "./views/Home";
import Forecast from "./views/Forecast"
import Budgets from "./views/Budgets";
import Transactions from "./views/Transactions";
import Savings from "./views/Savings";
import About from "./views/About";
import PageNotFound from "./views/PageNotFound";
import ReqLogin from "./views/ReqLogin";

//Sub Views
import SignUp from "./views/SignUp"
import SignIn from "./views/SignIn"
import TransactionsMonthly from "./views/TransactionsMonthly";
import BudgetsMonthly from "./views/BudgetsMonthly";

// Assets
import './assets/css/main.css';

// Contexts
export const UserContext = createContext()
export const FlashContext = createContext()

function App() {

  //
  // Check for existing Login Session
  // Gets session data from local storage if present
  // Obj {username, id, token} or false
  //
  const loginSession = getLoginSession() 

  //
  // User that is logged in. 
  // Obj {user, id} or false
  //
  const [user, setUser] = useState(loginSession);

  //
  // Check Login Token
  // If Token auth is successful, do nothing as state is already set
  // Call logoutHandler() if Token Auth fails
  //
  useEffect(  () => {

    function logoutHandler() {

      setUser(false)
      endLoginSession()
      logout(user.name)

    }
    
    async function getUserDbToken() {

      const userDBtoken = await getLoginToken({userId : user.id})
      if(!userDBtoken.login_token || !loginSession.token) logoutHandler()
      if(userDBtoken.login_token !== loginSession.token ) logoutHandler()

    }

    getUserDbToken()

  }, [user, loginSession.token])

  //
  // Flash Message
  // Displays Temporary Success or Error messages
  // Obj {type, message, link, linkText} or False
  //
  const [flash, setFlash] = useState(false)

  //
  // Set the document title
  // 
  document.title = 'Spendly: Money tracking app'





  return (
    <>

    <Style>
    {`
      main {
        margin-left : 260px;
      }
    `}
    </Style>


    <UserContext.Provider value={ [user, setUser] } >
    <FlashContext.Provider value={ [flash, setFlash] } >
    <Router basename="/" >
    <div className="App">

      {
      flash && <Flash type="success" message="Test" />
      }

      
      <div className="container">

        <SideBar />

        <main className="">
          <Routes>

            <Route path="/" element={ <Home /> } />

            <Route path="/sign-up" element={ <SignUp /> } />

            <Route path="/sign-in" element={ <SignIn /> } />

            <Route path="/forecast" element={ <Forecast /> } />
        
            <Route path="/budgets" element={ <Budgets /> } />

            <Route path="/budgets/:month" element={ <BudgetsMonthly /> } />
        
            <Route path="/transactions" element={ <Transactions /> } />

            <Route path="/transactions/:month" element={ <TransactionsMonthly /> } />
        
            <Route path="/savings" element={ <Savings /> } />
        
            <Route path="/about" element={ <About /> } />
        
            <Route path="*" element={ <PageNotFound /> } />

            <Route path="/req-login" element={ <ReqLogin /> } />
        
          </Routes>

        </main>

        <Footer/>

      </div>


    </div>
    </Router>
    </FlashContext.Provider>
    </UserContext.Provider>
    </>
  );
}

export default App;
