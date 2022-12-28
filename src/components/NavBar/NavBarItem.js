import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ChosenNavTab } from "../../App";
export default function NavBarItem(props) {
  const NavTab = useContext(ChosenNavTab);
  let clsName = "tab text-light p-0 my-0 mx-2 text-decoration-none";

  if (props.hideOnSmall) clsName += " d-none d-lg-block";
  if (NavTab.navTab === props.name) clsName += " selected";
  return (
    <Link
      onClick={() => {
        if (props.changeTab) {
          NavTab.setNavTab(props.name);
        }
      }}
      className="text-decoration-none"
      to={props.route}
    >
      <p className={clsName}>{props.name}</p>
    </Link>
  );
}
