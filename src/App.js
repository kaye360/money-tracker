import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Style } from "react-style-tag";
import { createContext, useState } from "react";

import SideBar from "./components/layout/SideBar";
import Footer from "./components/layout/Footer"
import Flash from "./components/layout/Flash";

import Home from "./views/Home";
import Budgets from "./views/Budgets";
import Transactions from "./views/Transactions";
import Savings from "./views/Savings";
import About from "./views/About";
import PageNotFound from "./views/PageNotFound";
import ReqLogin from "./views/ReqLogin";

import './assets/css/main.css'


export const UserContext = createContext()
export const FlashContext = createContext()

function App() {

  // User that is logged in. 
  // Obj {user, id} or false
  const [user, setUser] = useState(false);

  // Flash Message.
  // Obj {type, message, link, linkText} or False
  const [flash, setFlash] = useState(false)

  return (
    <>

    <Style>
    {`
      .main-layout {
        display : grid;
        grid-template-columns : 200px 1fr;
      }
    `}
    </Style>


    <UserContext.Provider value={ [user, setUser] } >
    <FlashContext.Provider value={ [flash, setFlash] } >
    <Router basename="/" >
    <div className="App">

      {
      flash && <Flash />
      }

      
      <div className="main-layout container">

        <SideBar />

        <main>
          <Routes>

            <Route path="/" element={ <Home /> } />
        
            <Route path="/budgets" element={ <Budgets /> } />
        
            <Route path="/transactions" element={ <Transactions /> } />
        
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
