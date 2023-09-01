import React, { useEffect, useState } from "react";
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
  Wrong_pass as PassLocal,
  getData,DATE_WRONG,Trys,setData,loginerr
} from "../utils/Storage";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../custom-hooks/QueryString";

export default function Login() {
  var currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // useEffect(()=>{
  //   console.log("dbdb");
  //   currentDate = new Date();
  //   const lastdatestr=getData(DATE_WRONG)
  //   const lastdate= new Date(lastdatestr)  
  //   if(lastdate==null){
  //  console.log("not yet");
  //   }
  //   else if (currentDate > lastdate ){
  //     console.log(" yet");
  //   }
  //   else{
  //     console.log("not ");
  //   }
    
  // },[]);
    const handleOtherButtonClick = () => {
    setIsButtonDisabled(true);
  };
  useEffect(() => {

    const timer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 30000); // 30 seconds in milliseconds

    return () => clearTimeout(timer);
  }, [isButtonDisabled]);

  const data = useQuery();
  const isAdmin = data.get("admin");

  const submit = () => {
    currentDate = new Date();
    const lastdatestr=getData(DATE_WRONG)
    const lastdate= new Date(lastdatestr)        
   if(lastdate!=null && lastdate>currentDate){
    setData(loginerr,'you cant submit for 30 sec')
    setLoginError(true)
    return
   }
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
          setData(Trys,0)
          setData(loginerr,'')
          navigate("/admin");
        } else {
          LoginLocal(
            data.password,
            data.name,
            data.email,
            data.birthDate,
            data.gender
          );
          setData(Trys,0)
          setData(loginerr,'')
          navigate("/");
        }

        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) {
          setLoginError(true)
          //here we go 
         var loctrys= getData(Trys)
         if (loctrys==null){
          loctrys=0
         }
         var addedtrys =(parseInt(loctrys)+1).toString()
         setData(Trys,addedtrys)
          if( addedtrys>=3 && addedtrys<4){
            setData(loginerr,"you tried 3 times you cant submit for 30 sec ");
            // handleOtherButtonClick()
            currentDate.setSeconds(currentDate.getSeconds() + 30);
           setData(DATE_WRONG,currentDate)
          }
          else if(addedtrys>=5){
            setData(loginerr,"you have submitted 5 wrong pasword your account have been deactivated  check your email");
            axios
            .post(
              API_URL_ROOT + (  "/api/Auth/wrongpass" ),
              {
                email: email,
                password: password,
              }
            ).then( )
          }
        else{
          setData(loginerr,"invalid login you have tried "+getData(Trys)+" times you have only 3 Tries   ");

        }


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
            <p className="text-danger m-0 p-0 mt-2">{getData(loginerr)}</p>
          ) : null}
          <button
            className="btn btn-dark m-2"  disabled={isButtonDisabled}
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
