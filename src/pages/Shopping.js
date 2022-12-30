import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Categorey from "../components/Shopping/Categorey";
import { Categories } from "../categories";

export default function Shopping() {
  return (
    <div className="shopping m-0 p-0 mx-auto">
      <NavBar selectedTab="Shopping" />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 w-100 mx-auto">
        {Categories.map((obj, i) => (
          <Categorey name={obj.name} image={obj.image} />
        ))}
      </div>
    </div>
  );
}
