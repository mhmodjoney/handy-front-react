import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Divider } from "@mui/material";
import Footer from "../components/Footer/Footer";
import Bill from "../components/Bills/Bill";
import { Bills as data } from "../bills";

export default function Bills() {
  return (
    <div className="m-0 p-0 mx-auto">
      <NavBar selectedTab="Bills" />
      <h2 className="shopping-header text-center m-3 rounded">Bills</h2>
      <Divider className="m-2" size="4" color="grey" />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 w-100 mx-auto">
        {data.map((obj, i) => (
          <Bill name={obj.name} image={obj.image} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
