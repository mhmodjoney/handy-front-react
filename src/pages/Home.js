import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { ChosenNavTab } from "../App";

export default function Home() {
  const NavTab = React.useContext(ChosenNavTab);
  NavTab.setNavTab("Home");
  return (
    <div>
      <NavBar />
      <div>Home1</div>
    </div>
  );
}
