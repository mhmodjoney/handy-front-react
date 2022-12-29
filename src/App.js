import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Shopping from "./pages/Shopping";
import Bills from "./pages/Bills";
import TransferMoney from "./pages/TransferMoney";
import "./styles/navbar.css";
import "./styles/coming-soon.css";
import "./styles/login.css";
import "./styles/signup.css";
import "./styles/shopping.css";
import React, { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
export const ChosenNavTab = createContext();

function App() {
  const location = useLocation();
  const route = location.pathname;
  let nav = "Home";

  if (route === "/shopping") nav = "Shopping";
  else if (route === "/bills") nav = "Bills";
  else if (route === "/money-transfer") nav = "Money Transfer";

  const [navTab, setNavTab] = useState(nav);
  return (
    <div className="App">
      <ChosenNavTab.Provider
        value={{
          navTab: navTab,
          setNavTab: (value) => {
            setNavTab(value);
          },
        }}
      >
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/shopping" element={<Shopping />}></Route>
          <Route exact path="/bills" element={<Bills />}></Route>
          <Route
            exact
            path="/money-transfer"
            element={<TransferMoney />}
          ></Route>
        </Routes>
      </ChosenNavTab.Provider>
    </div>
  );
}

export default App;
