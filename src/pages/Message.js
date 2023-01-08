import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import { useQuery } from "../custom-hooks/QueryString";
import { useNavigate } from "react-router-dom";
const IconClassName = "m-1";

const icons = {
  success: <CheckCircleIcon className={IconClassName} />,
  danger: <WarningIcon className={IconClassName} />,
  primary: <InfoIcon className={IconClassName} />,
};

export default function Message(props) {
  const data = useQuery();
  const next = data.get("next");
  const style = data.get("style");
  const text = data.get("text");
  const [redirectSeconds, setRedirectSeconds] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    if (next) {
      if (redirectSeconds === 0) {
        navigate(next);
        return;
      }
      setTimeout(() => {
        setRedirectSeconds(redirectSeconds - 1);
      }, 1000);
    }
  }, [redirectSeconds]);
  return (
    <div>
      <NavBar />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "60vh" }}
      >
        <h2 className={`alert alert-${style}`}>
          {icons[style]}
          {text}
        </h2>
      </div>
      {next ? <p>redirect after {redirectSeconds} seconds</p> : null}
      <Footer />
    </div>
  );
}
