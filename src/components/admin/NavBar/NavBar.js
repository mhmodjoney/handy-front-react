import React from "react";
import logo from "../../../assets/images/logo.png";
import AccountPopUp from "./AccountPopUp";
import NavBarItem from "./NavBarItem";
import { useContext } from "react";
import { AdminLoggedInContext } from "../../../App";
import { ADMIN_STATE, getData } from "../../../utils/Storage";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  const { adminLoggedIn } = useContext(AdminLoggedInContext);
  const isSuperAdmin = getData(ADMIN_STATE) === "superadmin";
  return (
    <nav className="navbar w-100 py-3 px-2 bg-dark position-sticky top-0 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <Link to="/">
          <img
            src={logo}
            className="logo img-fluid d-none d-lg-block"
            alt="app icon"
          />
        </Link>
        <NavBarItem
          name="Users"
          route="/admin/users"
          selectedTab={props.selectedTab}
        />
        <NavBarItem
          name="Payments"
          route="/admin/payments"
          selectedTab={props.selectedTab}
        />
        {isSuperAdmin ? (
          <NavBarItem
            name="Admins"
            route="/admin/admins"
            selectedTab={props.selectedTab}
          />
        ) : null}
      </div>

      <div className="d-flex align-items-center">
        {adminLoggedIn ? (
          <AccountPopUp />
        ) : (
          <>
            <NavBarItem
              name="Login"
              route="/login"
              selectedTab={props.selectedTab}
            />
            <NavBarItem
              name="Sign Up"
              route="/signup"
              selectedTab={props.selectedTab}
            />
          </>
        )}
      </div>
    </nav>
  );
}
