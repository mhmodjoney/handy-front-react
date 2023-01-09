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
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Products from "./pages/Products";
import PaymentHistory from "./pages/PaymentHistory";
import { API_URL_ROOT } from "./data/constants";
import { getData, TOKEN } from "./utils/Storage";
import Protected from "./utils/ProtectedRoute";
import Loading from "./components/Loading";
import { Logout } from "./utils/Storage";
import VerifyEmail from "./pages/VerifyEmail";
import Message from "./pages/Message";
import ForgotPassword from "./pages/ForgotPassword";
import { ThemeProvider, createTheme } from "@mui/material";

const checkToken = async () => {
  let res = null;
  await axios
    .post(
      API_URL_ROOT + "/api/Auth/vladateToken",
      {},
      {
        headers: {
          Authorization: getData(TOKEN),
        },
      }
    )
    .then((response) => {
      res = [true, response];
    })
    .catch((error) => {
      res = [false, error.response];
    });

  return res;
};

export const LoggedInContext = createContext();

function App() {
  const defaultMaterialTheme = createTheme();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getData(TOKEN)) {
      setLoading(true);
      checkToken().then((res) => {
        setLoading(false);
        setLoggedIn(res[0]);
        console.log(res);
        if (!res[0] && res[1].status === 400) Logout();
      });
    }
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={defaultMaterialTheme}>
        <LoggedInContext.Provider
          value={{
            loggedIn: loggedIn,
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<SignUp />}></Route>
              <Route
                exact
                path="/forgotpassword/:uuid"
                element={<ForgotPassword />}
              ></Route>
              <Route
                exact
                path="/verifyemail/:uuid"
                element={<VerifyEmail />}
              ></Route>
              <Route exact path="/message" element={<Message />}></Route>
              <Route
                exact
                path="/shopping"
                element={
                  <Protected>
                    <Shopping />
                  </Protected>
                }
              ></Route>
              <Route
                exact
                path="/bills"
                element={
                  <Protected>
                    <Bills />
                  </Protected>
                }
              ></Route>
              <Route
                exact
                path="/money-transfer"
                element={
                  <Protected>
                    <TransferMoney />
                  </Protected>
                }
              ></Route>
              <Route
                exact
                path="/products/:categorey"
                element={
                  <Protected>
                    <Products />
                  </Protected>
                }
              ></Route>
              <Route
                exact
                path="/payment-history"
                element={
                  <Protected>
                    <PaymentHistory />
                  </Protected>
                }
              ></Route>
            </Routes>
          )}
        </LoggedInContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
