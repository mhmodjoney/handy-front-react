import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Shopping from "./pages/Shopping/Shopping";
import Bills from "./pages/Bills";
import TransferMoney from "./pages/TransferMoney";
import "./styles/navbar.css";
import "./styles/coming-soon.css";
import "./styles/login.css";
import "./styles/signup.css";
import "./styles/shopping.css";
import React, { createContext, useState } from "react";

export const ChosenNavTab = createContext();
function App() {
  console.log(window.location.href);
  const [navTab, setNavTab] = useState("Home");
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
            path="/transfer-money"
            element={<TransferMoney />}
          ></Route>
        </Routes>
      </ChosenNavTab.Provider>
    </div>
  );
}

export default App;
