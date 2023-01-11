import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from "./pages/admin/Home";
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
import {
  getData,
  TOKEN,
  ADMIN_TOKEN,
  Logout,
  adminLogout,
} from "./utils/Storage";
import Protected from "./utils/ProtectedRoute";
import AdminProtected from "./utils/AdminProtectedRoute";
import Loading from "./components/Loading";
import VerifyEmail from "./pages/VerifyEmail";
import Message from "./pages/Message";
import ForgotPassword from "./pages/ForgotPassword";
import { ThemeProvider, createTheme } from "@mui/material";
import { Navigate } from "react-router-dom";
import { HashRouter } from "react-router-dom";
const checkToken = async (isAdmin) => {
  let res = null;
  await axios
    .post(
      API_URL_ROOT + "/api/Auth/vladateToken",
      {},
      {
        headers: {
          Authorization: isAdmin ? getData(ADMIN_TOKEN) : getData(TOKEN),
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
export const AdminLoggedInContext = createContext();

function App() {
  const defaultMaterialTheme = createTheme();
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const loading = loading1 || loading2;
  console.log(getData(TOKEN));
  useEffect(() => {
    if (getData(TOKEN)) {
      setLoading1(true);
      checkToken(false).then((res) => {
        setLoggedIn(res[0]);
        setLoading1(false);

        if (!res[0] && res[1].status === 400) Logout();
      });
    }
  }, []);

  useEffect(() => {
    if (getData(ADMIN_TOKEN)) {
      setLoading2(true);
      checkToken(true).then((res) => {
        setAdminLoggedIn(res[0]);
        setLoading2(false);
        if (!res[0] && res[1].status === 400) adminLogout();
      });
    }
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={defaultMaterialTheme}>
        {loading ? (
          <Loading />
        ) : (
          <LoggedInContext.Provider
            value={{
              loggedIn: loggedIn,
            }}
          >
            <AdminLoggedInContext.Provider
              value={{
                adminLoggedIn: adminLoggedIn,
              }}
            >
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

                <Route
                  exact
                  path="/admin"
                  element={
                    <AdminProtected>
                      <AdminHome />
                    </AdminProtected>
                  }
                ></Route>
              </Routes>
            </AdminLoggedInContext.Provider>
          </LoggedInContext.Provider>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
