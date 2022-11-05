import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Style } from "react-style-tag";

import SideBar from "./components/layout/SideBar";
import Footer from "./components/layout/Footer"

import Home from "./views/Home";
import Budgets from "./views/Budgets";
import Transactions from "./views/Transactions";
import Savings from "./views/Savings";
import About from "./views/About";
import PageNotFound from "./views/PageNotFound";
import { useState } from "react";

function App() {

  const [user, setUser] = useState(false);

  return (
    <>
    
    <Style>{`
      .App {
        display : grid;
        grid-template-columns : 200px 1fr;
      }
    `}</Style>


    <Router basename="/" >

    <div className="App">

      <SideBar user={ user } />

      <main>
        <Routes>

          <Route path="/" element={ <Home setUser={ setUser } /> } />
      
          <Route path="/budgets" element={ <Budgets /> } />
      
          <Route path="/transactions" element={ <Transactions /> } />
      
          <Route path="/savings" element={ <Savings /> } />
      
          <Route path="/about" element={ <About /> } />
      
          <Route path="*" element={ <PageNotFound /> } />
      
        </Routes>

      </main>

      <Footer/>

    </div>
    </Router>
    </>
  );
}

export default App;
