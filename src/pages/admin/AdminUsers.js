import React from "react";
import NavBar from "../../components/admin/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
export default function Home() {
  return (
    <div>
      <NavBar selectedTab="Users" />
      <div>Admin Home</div>
      <Footer />
    </div>
  );
}
