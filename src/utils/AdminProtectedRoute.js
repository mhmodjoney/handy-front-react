import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminLoggedInContext } from "../App";
import { getData, ADMIN_TOKEN } from "../utils/Storage";
const AdminProtected = ({ children }) => {
  const { adminLoggedIn } = useContext(AdminLoggedInContext);
  if (!adminLoggedIn&& (getData(ADMIN_TOKEN)==="null"||!getData(ADMIN_TOKEN))) {
    return <Navigate to="/login?admin=true" replace />;
  }
  return children;
};
export default AdminProtected;
