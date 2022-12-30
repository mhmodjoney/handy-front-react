import React from "react";
import { Link } from "react-router-dom";
export default function NavBarItem(props) {
  let clsName = "tab text-light p-0 my-0 mx-2 text-decoration-none";

  if (props.hideOnSmall) clsName += " d-none d-lg-block";
  if (props.selectedTab === props.name) clsName += " selected";
  return (
    <Link className="text-decoration-none" to={props.route}>
      <p className={clsName}>{props.name}</p>
    </Link>
  );
}
