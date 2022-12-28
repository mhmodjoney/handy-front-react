import React from "react";
import image from "../../assets/images/coming-soon.jpg";
import NavBar from "../../components/NavBar/NavBar";

export default function ComingSoon() {
  return (
    <div>
      <NavBar />
      <div className="coming-soon w-100 d-flex align-items-center justify-content-center">
        <img className="img-fluid" src={image} alt="coming soon"></img>
      </div>
    </div>
  );
}
