import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { validatePassword } from "../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL_ROOT } from "../data/constants";
import CircularProgress from "@mui/material/CircularProgress";

export default function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [PasswordError, setPasswordError] = useState(false);
  const [ConfirmPasswordError, setConfirmPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { uuid } = useParams();

  const submit = () => {
    let error = false;
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      error = true;
    } else setConfirmPasswordError(false);

    if (!validatePassword(password)) {
      setPasswordError(true);
      error = true;
    } else setPasswordError(false);
    if (error) return;

    setLoading(true);

    axios
      .post(`${API_URL_ROOT}/api/Auth/UpdatePass/${uuid}`, {
        password: password,
      })
      .then(() => {
        navigate(
          "/message?text=Your password has been reseted successfully&style=success&next=/login"
        );
      })
      .catch(() => {
        navigate(
          "/message?text=Your session has expiredy&style=danger"
        );
      });
  };

  return (
    <div className="signup">
      <h1 className="text-center text-light position-fixed start-0 end-0">
        Handy
      </h1>
      <div className="box-parent d-flex justify-content-center align-items-center">
        <div className="box px-4 py-3 bg-light d-flex flex-column align-items-center rounded">
          <h3>Enter your data</h3>
          <TextField
            label="Password"
            value={password}
            className="m-2 w-100"
            error={PasswordError ? true : false}
            helperText={
              PasswordError
                ? "Password must be at least 12 letters and numbers"
                : ""
            }
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

          <TextField
            label="Confirm Password"
            value={confirmPassword}
            className="m-2  w-100"
            type={showConfirmPassword ? "text" : "password"}
            error={ConfirmPasswordError ? true : false}
            helperText={ConfirmPasswordError ? "Passwrod doesn't match" : ""}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                    className="p-0 m-0"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <button
            className="btn btn-dark m-2"
            onClick={loading ? null : submit}
          >
            {loading ? (
              <CircularProgress size={40} color="inherit" />
            ) : (
              <p className="m-0 p-0">Confirm</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
