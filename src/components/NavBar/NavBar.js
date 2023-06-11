import React from "react";
import logo from "../../assets/images/logo.png";
import AccountPopUp from "./AccountPopUp";
import Menu from "./Menu";
import NavBarItem from "./NavBarItem";
import { useContext } from "react";
import { LoggedInContext } from "../../App";

export default function NavBar(props) {
  const { loggedIn } = useContext(LoggedInContext);
  return (
    <nav className="navbar w-100 py-3 px-2 bg-dark position-sticky top-0 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <Menu />
        <img
          src={logo}
          className="logo img-fluid d-none d-lg-block"
          alt="app icon"
        />
        <NavBarItem name="Home" route="/" selectedTab={props.selectedTab} />
        <NavBarItem
          name="Shopping"
          route="/shopping"
          selectedTab={props.selectedTab}
        />
        <NavBarItem
          name="Bills"
          route="/bills"
          hideOnSmall={true}
          selectedTab={props.selectedTab}
        />
      
        {loggedIn ? (
          <NavBarItem
            name="Payment History"
            route="/payment-history"
            hideOnSmall={true}
            selectedTab={props.selectedTab}
          />
        ) : null}
      </div>

      <div className="d-flex align-items-center">
        {loggedIn ? (
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
