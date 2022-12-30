import React from "react";
import NavBar from "../components/NavBar/NavBar";
import ComingSoon from "./ComingSoon";

export default function TransferMoney() {
  return (
    <div>
      <NavBar selectedTab="Money Transfer" />
      <ComingSoon />
    </div>
  );
}
