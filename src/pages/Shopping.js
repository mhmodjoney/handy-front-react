import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Categorey from "../components/Shopping/Categorey";
import Footer from "../components/Footer/Footer";
import { Categories } from "../categories";
import { Divider } from "@mui/material";

export default function Shopping() {
  return (
    <div className="shopping m-0 p-0 mx-auto">
      <NavBar selectedTab="Shopping" />
      <h2 className="shopping-header text-center m-3 rounded">
        All Categories
      </h2>
      <Divider className="m-2" size="4" color="grey" />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 w-100 mx-auto">
        {Categories.map((obj, i) => (
          <Categorey name={obj.name} image={obj.image} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
