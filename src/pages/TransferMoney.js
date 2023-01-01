import React from "react";
import NavBar from "../components/NavBar/NavBar";
import ComingSoon from "./ComingSoon";
import Footer from "../components/Footer/Footer";

export default function TransferMoney() {
  return (
    <div>
      <NavBar selectedTab="Money Transfer" />
      <ComingSoon />
      <Footer />
    </div>
  );
}
