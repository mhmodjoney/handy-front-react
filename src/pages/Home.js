import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
export default function Home() {
  return (
    <div>
      <NavBar selectedTab="Home" />
      <div>Home1</div>
      <Footer />
    </div>
  );
}
