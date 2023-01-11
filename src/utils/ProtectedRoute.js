import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedInContext, AdminLoggedInContext } from "../App";
const Protected = ({ children }) => {
  const { loggedIn } = useContext(LoggedInContext);
  const { adminLoggedIn } = useContext(AdminLoggedInContext);
  console.log(loggedIn);
  console.log(adminLoggedIn);
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
