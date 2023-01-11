import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InputAdornment from "@mui/material/InputAdornment";
import moment from "moment";
import {
  USERNAME,
  EMAIL,
  BIRTH,
  GENDER,
  getData,
  setData,
} from "../../utils/Storage";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import { API_URL_ROOT } from "../../data/constants";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EditData() {
  const email = getData(EMAIL);
  const [nameError, setNameError] = useState(false);
  const [name, setName] = useState(getData(USERNAME));
  const [birth, setBirth] = React.useState(moment(getData(BIRTH)));
  const [gender, setGender] = useState(getData(GENDER));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = () => {
    if (!name) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setLoading(true);

    axios
      .put(API_URL_ROOT + "/api/customer", {
        name: name,
        email: email,
        gender: gender,
        birthDate: birth._d,
      })
      .then((response) => {
        setLoading(false);
        setData(USERNAME, name);
        setData(GENDER, gender);
        setData(BIRTH, birth._d);
        navigate(
          "/message?text=Your profile has been Updated successfully&style=success&next=/"
        );
      })
      .catch((error) => {
        setLoading(false);
        navigate(
          "/message?text=An error ocurred while updating your profile&style=danger&next=/"
        );
      });
  };
  return (
    <div className="d-flex align-items-center flex-column">
      <TextField
        label="Email"
        type="email"
        value={email}
        className="m-2"
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
        error={nameError ? true : false}
        helperText={nameError ? "this field is required" : ""}
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        className="m-2"
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
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        <DesktopDatePicker
          label="Birth Date"
          inputFormat="YYYY-MM-DD"
          className="m-2"
          value={birth}
          onChange={(newValue) => {
            console.log(newValue)
            setBirth(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <button className="btn btn-success m-2 dialog-btn" onClick={submit}>
        {loading ? (
          <CircularProgress size={40} color="inherit" />
        ) : (
          <p className="m-0 p-0">confirm</p>
        )}
      </button>
    </div>
  );
}
