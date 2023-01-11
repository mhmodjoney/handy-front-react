import { Navigate } from "react-router-dom";
import {useContext} from "react";
import {LoggedInContext,AdminLoggedInContext} from "../App"

const AdminProtected = ({ children }) => {
  const { adminLoggedIn } = useContext(AdminLoggedInContext);
  if (!adminLoggedIn) {
    return <Navigate to="/login?admin=true" replace />;
  }
  return children;
};
export default AdminProtected;
