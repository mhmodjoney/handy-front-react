import React from "react";
import ComingSoon from "./ComingSoon";
import { ChosenNavTab } from "../App";

export default function TransferMoney() {
  const NavTab = React.useContext(ChosenNavTab);
  NavTab.setNavTab("Money Transfer");
  return <ComingSoon />;
}
