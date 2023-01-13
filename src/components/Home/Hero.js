import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../../App";
import data from "../../data/heroSection.json";

const Hero = () => {
  const { loggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="container-hero">
        <div className="content-hero">
          <div className="left-side">
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <div className="form-group">
              {loggedIn ? null : (
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Try it free
                </button>
              )}
            </div>
          </div>

          <div className="right-side">
            <img src="/hero.svg" className="m-0 p-0 img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
