import React from "react";
import logo from "../../../assets/images/logo.png";
import AccountPopUp from "./AccountPopUp";
import NavBarItem from "./NavBarItem";
import { useContext } from "react";
import { AdminLoggedInContext } from "../../../App";

export default function NavBar(props) {
  const { adminLoggedIn } = useContext(AdminLoggedInContext);
  return (
    <nav className="navbar w-100 py-3 px-2 bg-dark position-sticky top-0 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img
          src={logo}
          className="logo img-fluid d-none d-lg-block"
          alt="app icon"
        />
        <NavBarItem name="Users" route="/admin/users" selectedTab={props.selectedTab} />
        <NavBarItem name="Payments" route="/admin/payments" selectedTab={props.selectedTab} />
        <NavBarItem name="Admins" route="/admin/admins" selectedTab={props.selectedTab} />
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
