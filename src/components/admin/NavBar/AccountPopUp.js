import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";
import { IconButton } from "@mui/material";
import profile from "../../../assets/images/profile.png";
import { adminLogout } from "../../../utils/Storage";
import { useNavigate } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { getData, ADMIN_USERNAME, ADMIN_EMAIL } from "../../../utils/Storage";
export default function AccountPopUp() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = (value) => {
    setDialogOpen(false);
  };

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    adminLogout();
    handleClosePopover();
    navigate("/");
    window.location.reload();
  };


  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? "account-popover" : undefined;
  return (
    <div>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClickPopover}
        className="tab text-light p-0 my-0 mx-2"
      >
        <AccountCircleIcon />
      </IconButton>

      <Popover
        id={id}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="d-flex flex-column m-2 align-items-center">
          <img
            alt="profile"
            src={profile}
            className="img-fluid"
            width="100px"
            height="100px"
          ></img>
          <h6 className="mt-1 m-0 p-0 text-black text-center">
            {getData(ADMIN_USERNAME)}
          </h6>
          <p className="mt-1 p-0 text-secondary text-center">
            {getData(ADMIN_EMAIL)}
          </p>

          <button className="btn btn-danger p-1 mt-1" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </Popover>

      <Dialog onClose={handleCloseDialog} open={dialogOpen}>
        <DialogTitle className="text-center dialog-title">
          Edit your personal data
        </DialogTitle>
      </Dialog>
    </div>
  );
}
