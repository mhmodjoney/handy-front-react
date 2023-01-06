import { Navigate } from "react-router-dom";
import {useContext} from "react";
import {LoggedInContext} from "../App"
const Protected = ({ children }) => {
  const { loggedIn } = useContext(LoggedInContext);
  console.log(loggedIn);
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
