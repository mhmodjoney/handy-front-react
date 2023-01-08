import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import { useQuery } from "../custom-hooks/QueryString";
const IconClassName = "m-1";

const icons = {
  success: <CheckCircleIcon className={IconClassName} />,
  danger: <WarningIcon className={IconClassName} />,
  primary: <InfoIcon className={IconClassName} />,
};

export default function Message(props) {
  const data = useQuery();
  console.log(data);
  return (
    <div>
      <NavBar />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "60vh" }}
      >
        <h2 className={`alert alert-${data.get("style")}`}>
          {icons[data.get("style")]}
          {data.get("text")}
        </h2>
      </div>
      <Footer />
    </div>
  );
}
