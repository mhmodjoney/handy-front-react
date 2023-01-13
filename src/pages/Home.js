import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Home/Hero";
import Services from "../components/Home/Services";
import Management from "../components/Home/Management";
import TrustUs from "../components/Home/TrustUs";
import Header from "../components/Home/Header";

export default function Home() {
  return (
    <div>
      <NavBar selectedTab="Home" />
      <Header/>
      <Hero />
      <Services />
      <Management />
      <TrustUs />

      <Footer />
    </div>
  );
}
