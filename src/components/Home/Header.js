import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../../App";

const Header = () => {
  const { loggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate();
  return (
    <header>
      <h3 className="logo"></h3>
      <div className="btn-try">
        {loggedIn ? null : (
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            Try free
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
