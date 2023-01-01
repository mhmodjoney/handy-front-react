import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
export default function Home() {
  if (localStorage.getItem("logged")) console.log("logged");
  return (
    <div>
      <NavBar selectedTab="Home" />
      <div>Home1</div>
      <Footer />
    </div>
  );
}
