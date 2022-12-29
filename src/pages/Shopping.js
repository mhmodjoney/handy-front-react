import React, { useContext } from "react";
import NavBar from "../components/NavBar/NavBar";
import Categorey from "../components/Shopping/Categorey";
import { Categories } from "../categories";
import { ChosenNavTab } from "../App";

export default function Shopping() {
  const NavTab = useContext(ChosenNavTab);
  NavTab.setNavTab("Shopping");
  return (
    <div className="shopping m-0 p-0 mx-auto">
      <NavBar />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 w-100 mx-auto">
        {Categories.map((obj, i) => (
          <Categorey name={obj.name} image={obj.image} />
        ))}
      </div>
    </div>
  );
}
