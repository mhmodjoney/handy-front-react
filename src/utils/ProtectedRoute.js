import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedInContext } from "../App";
import { getData, TOKEN } from "../utils/Storage";

const Protected = ({ children }) => {
  const { loggedIn } = useContext(LoggedInContext);
  // if (!loggedIn && (getData(TOKEN)==="null"||!getData(TOKEN))) {
  //   return <Navigate to="/login" replace />;
  // }
  return children;
};
export default Protected;
