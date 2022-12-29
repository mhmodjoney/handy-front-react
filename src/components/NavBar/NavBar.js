import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../assets/images/logo.png";
import NavBarItem from "./NavBarItem";

export default function NavBar() {
  return (
    <nav className="navbar w-100 py-3 px-2 bg-dark position-sticky top-0 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img src={logo} className="logo img-fluid" alt="app icon" />
        <NavBarItem name="Home" route="/" changeTab={true} />
        <NavBarItem name="Shopping" route="/shopping" changeTab={true} />
        <NavBarItem
          name="Bills"
          route="/bills"
          hideOnSmall={true}
          changeTab={true}
        />
        <NavBarItem
          name="Money Transfer"
          route="/transfer-money"
          hideOnSmall={true}
          changeTab={true}
        />
      </div>

      <div className="d-flex align-items-center">
        <NavBarItem name="Login" route="/login" noNav={true} />
        <NavBarItem name="Sign Up" route="/signup" noNav={true} />
        <AccountCircleIcon className="tab text-light p-0 my-0 mx-2" />
      </div>
    </nav>
  );
}
