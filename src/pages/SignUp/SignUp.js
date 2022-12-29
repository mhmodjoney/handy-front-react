import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import { validateEmail, validatePassword } from "../../constants";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment/moment";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("female");
  const [birth, setBirth] = React.useState(moment("1999-08-18"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [ConfirmPasswordError, setConfirmPasswordError] = useState(false);

  const submit = () => {
    let error = false;
    if (!validateEmail(email)) {
      setEmailError(true);
      error = true;
    } else setEmailError(false);

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      error = true;
    } else setConfirmPasswordError(false);

    if (!validatePassword(password)) {
      setPasswordError(true);
      error = true;
    } else setPasswordError(false);

    console.log(birth._i);

    if (error) return;
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
            label="Name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="m-2 w-100"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountBoxIcon />
                </InputAdornment>
              ),
            }}
          />

          <div className="m-2 d-flex flex-wrap align-items-start justify-content-center">
            <FormControl className="align-self-start m-2">
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(event) => {
                  setGender(event.target.value);
                }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
            <DesktopDatePicker
              label="Birth Date"
              inputFormat="YYYY-MM-DD"
              className="m-2"
              value={birth}
              onChange={(newValue) => {
                setBirth(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className="m-2 d-flex flex-wrap align-items-start justify-content-center">
            <TextField
              label="Password"
              value={password}
              className="m-2"
              error={PasswordError ? true : false}
              helperText={
                PasswordError
                  ? "Password must be at least 8 letters and numbers"
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
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              value={confirmPassword}
              className="m-2"
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
          </div>
          <button className="btn btn-dark m-2" onClick={submit}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
