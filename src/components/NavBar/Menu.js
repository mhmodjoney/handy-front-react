import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Popover from "@mui/material/Popover";
import { Link } from "react-router-dom";

export default function Menu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "account-popover" : undefined;

  return (
    <div className="d-block d-lg-none text-light">
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="tab text-light p-0 my-0 mx-2"
      >
        <MenuIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="d-flex flex-column m-2 align-items-center">
          <Link className="text-decoration-none" to="/bills">
            <p className="mt-1 m-0 p-0 text-black">Bills</p>
          </Link>

          <Link className="text-decoration-none" to="/payment-history">
            <p className="mt-1 m-0 p-0 text-black">Payment History</p>
          </Link>
        </div>
      </Popover>
    </div>
  );
}
