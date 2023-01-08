import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CurrencyInput from "react-currency-input-field";
import TextField from "@mui/material/TextField";
import { API_URL_ROOT } from "../../data/constants";
import { getData, TOKEN } from "../../utils/Storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
export default function BillPayButton(props) {
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const [billId, setBillId] = React.useState("");
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
          type: "bill",
          description: `Paid ${price}$ on ${props.name} with a last bill id :${billId}`,
          amount: price * 100,
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
      <button onClick={handleClickOpen} className="btn btn-success">
        pay
      </button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle className="text-center dialog-title">
          <strong>{props.name}</strong> payment
        </DialogTitle>
        <h6 className="text-secondary text-center m-2 rounded">
          Please enter your last bill id
        </h6>

        <TextField
          className="mx-auto my-2"
          label="bill id"
          type="numnber"
          value={billId}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onChange={(event) => {
            setBillId(event.target.value);
          }}
        />

        <h6 className="text-secondary text-center m-2 rounded">
          Please enter the amount you want to pay
        </h6>
        <CurrencyInput
          placeholder="amount"
          prefix="$"
          value={price}
          decimalsLimit={2}
          className="mx-auto my-2 p-3 d-table"
          onValueChange={(value, name) => setPrice(value)}
        />

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
