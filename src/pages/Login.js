import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import { validateEmail } from "../utils/utils";
import { API_URL_ROOT } from "../data/constants";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Login as LoginLocal,
  adminLogin as AdminLoginLocal,
} from "../utils/Storage";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../custom-hooks/QueryString";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const data = useQuery();
  const isAdmin = data.get("admin");
  const submit = () => {
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setLoading(true);
    axios
      .post(
        API_URL_ROOT + (isAdmin ? "/api/admins/login" : "/api/Auth/login"),
        {
          email: email,
          password: password,
        }
      )
      .then((response) => {
        let data = response.data;
        if (isAdmin) {
          AdminLoginLocal(
            data.password,
            data.name,
            data.email,
            data.birthDate,
            data.gender,
            data.state
          );
          navigate("/admin");
        } else {
          LoginLocal(
            data.password,
            data.name,
            data.email,
            data.birthDate,
            data.gender
          );
          navigate("/");
        }

        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) {
          setLoginError(true);
        }
      });
  };

  return (
    <div className="login">
      <h1 className="text-center text-light position-fixed start-0 end-0">
        Handy
      </h1>
      <div className="box-parent d-flex justify-content-center align-items-center">
        <div className="box px-4 py-3 bg-light d-flex flex-column align-items-center rounded">
          <h3>Enter your data</h3>
          <TextField
            error={emailError ? true : false}
            helperText={emailError ? "please enter a valid email" : ""}
            label="Email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="m-2 w-100"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            value={password}
            className="m-2 w-100"
            type={showPassword ? "text" : "password"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="p-0 m-0"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            className="align-self-start"
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
          {isAdmin ? null : (
            <>
              <Link
                to="/signup"
                className="align-self-start text-decoration-none"
              >
                new to Handy?
              </Link>

              <Link
                className="align-self-start text-decoration-none"
                onClick={() => {
                  if (!validateEmail(email)) {
                    setEmailError(true);
                    return;
                  }
                  setEmailError(false);
                  setLoading(true);
                  axios
                    .post(`${API_URL_ROOT}/api/Auth/forgotPass`, {
                      email: email,
                    })
                    .then(() => {
                      setLoading(false);
                      navigate(
                        "/message?text=We sent to your email a link to change your password&style=success"
                      );
                    })
                    .catch(() => {
                      setLoading(false);
                      navigate(
                        "/message?text=An error occurred while trying to send you a change password link&style=danger"
                      );
                    });
                }}
              >
                Forgot your password?
              </Link>
            </>
          )}
          {loginError ? (
            <p className="text-danger m-0 p-0 mt-2">invalid login</p>
          ) : null}
          <button
            className="btn btn-dark m-2"
            onClick={loading ? null : submit}
          >
            {loading ? (
              <CircularProgress size={40} color="inherit" />
            ) : (
              <p className="m-0 p-0">Login</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
