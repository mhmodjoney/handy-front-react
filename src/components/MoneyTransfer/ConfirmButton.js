import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { API_URL_ROOT } from "../../data/constants";
import { getData, TOKEN } from "../../utils/Storage";
export default function ConfirmButton(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const submit = () => {
    setLoading(true);
    axios
      .post(
        `${API_URL_ROOT}/api/Payment`,
        {
          product_id: 0,
          type: "transfer",
          Quantity: 1,
          description: `transferd ${props.price}$ to ${props.name}`,
          amount: props.price * 100,
          name: props.name,
        },
        {
          headers: {
            Authorization: getData(TOKEN),
          },
        }
      )
      .then((res) => {
        setLoading(false);
        window.location.href = res.data;
      })
      .catch(() => {
        navigate(
          `/message?text=An error occured while paying&style=danger&next=/bills`
        );
        setLoading(false);
      });
  };

  return (
    <div className="mx-auto">
      <button
        className="btn btn-success mx-auto my-4 p-3 d-table"
        onClick={handleClickOpen}
      >
        Pay
      </button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle className="text-center dialog-title">
          Are you sure you want to pay
        </DialogTitle>

        <button className="btn btn-success m-2 dialog-btn" onClick={submit}>
          {loading ? (
            <CircularProgress size={40} color="inherit" />
          ) : (
            <p className="m-0 p-0">confirm payment</p>
          )}
        </button>
      </Dialog>
    </div>
  );
}
