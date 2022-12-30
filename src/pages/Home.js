import React from "react";
import NavBar from "../components/NavBar/NavBar";

export default function Home() {
  if (localStorage.getItem("logged")) console.log("logged");
  return (
    <div>
      <NavBar selectedTab="Home" />
      <div>Home1</div>
    </div>
  );
}
