import React from "react";
import ComingSoon from "./ComingSoon";
import { ChosenNavTab } from "../App";
export default function Bills() {
  const NavTab = React.useContext(ChosenNavTab);
  NavTab.setNavTab("Bills");
  return <ComingSoon />;
}
