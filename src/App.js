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
import "./styles/loading.css";
import React from "react";
import Products from "./pages/Products";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/shopping" element={<Shopping />}></Route>
        <Route exact path="/bills" element={<Bills />}></Route>
        <Route exact path="/money-transfer" element={<TransferMoney />}></Route>
        <Route exact path="/products/:categorey" element={<Products />}></Route>
      </Routes>
    </div>
  );
}

export default App;
