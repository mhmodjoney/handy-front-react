import React from "react";
import NavBar from "../components/NavBar/NavBar";
import ComingSoon from "./ComingSoon";
import Footer from "../components/Footer/Footer";
export default function Bills() {
  return (
    <div>
      <NavBar selectedTab="Bills" />
      <ComingSoon />
      <Footer />
    </div>
  );
}
