import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import { validateEmail } from "../constants";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const submit = () => {
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    console.log("hi");
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

          <button className="btn btn-dark m-2" onClick={submit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
