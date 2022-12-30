import React from "react";
import NavBar from "../components/NavBar/NavBar";
import ComingSoon from "./ComingSoon";
export default function Bills() {
  return (
    <div>
      <NavBar selectedTab="Bills" />
      <ComingSoon />
    </div>
  );
}
