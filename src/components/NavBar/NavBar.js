import React from "react";
import logo from "../../assets/images/logo.png";
import AccountPopUp from "./AccountPopUp";
import Menu from "./Menu";
import NavBarItem from "./NavBarItem";

export default function NavBar(props) {
  return (
    <nav className="navbar w-100 py-3 px-2 bg-dark position-sticky top-0 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <Menu />
        <img
          src={logo}
          className="logo img-fluid d-none d-lg-block"
          alt="app icon"
        />
        <NavBarItem
          name="Home"
          route="/"
          changeTab={true}
          selectedTab={props.selectedTab}
        />
        <NavBarItem
          name="Shopping"
          route="/shopping"
          changeTab={true}
          selectedTab={props.selectedTab}
        />
        <NavBarItem
          name="Bills"
          route="/bills"
          hideOnSmall={true}
          changeTab={true}
          selectedTab={props.selectedTab}
        />
        <NavBarItem
          name="Money Transfer"
          route="/money-transfer"
          hideOnSmall={true}
          changeTab={true}
          selectedTab={props.selectedTab}
        />
      </div>

      <div className="d-flex align-items-center">
        <NavBarItem
          name="Login"
          route="/login"
          noNav={true}
          selectedTab={props.selectedTab}
        />
        <NavBarItem
          name="Sign Up"
          route="/signup"
          noNav={true}
          selectedTab={props.selectedTab}
        />
        <AccountPopUp />
      </div>
    </nav>
  );
}
