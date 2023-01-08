import React, { useState,createContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";
import { IconButton } from "@mui/material";
import profile from "../../assets/images/profile.png";
import { Logout } from "../../utils/Storage";
import { useNavigate } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import EditData from "./EditData";

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
    Logout();
    handleClosePopover();
    navigate("/");
    window.location.reload();
  };

  const handleEditData = () => {
    handleClickOpenDialog();
    handleClosePopover();
  };
  const handleGoToAdmin = () => {
    handleClosePopover();
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
            Abdulrhman Sayed Ali
          </h6>
          <p className="mt-1 p-0 text-secondary text-center">abd@gmail.com</p>

          <button className="btn btn-danger p-1 mt-1" onClick={handleLogout}>
            Logout
          </button>
          <button
            className="btn btn-secondary p-1 mt-1"
            onClick={handleEditData}
          >
            edit data
          </button>
          <button
            className="btn btn-secondary p-1 mt-1"
            onClick={handleGoToAdmin}
          >
            go to admin
          </button>
        </div>
      </Popover>

      <Dialog onClose={handleCloseDialog} open={dialogOpen}>
        <DialogTitle className="text-center dialog-title">
          Edit your personal data
        </DialogTitle>
        <EditData/>
      </Dialog>
    </div>
  );
}
