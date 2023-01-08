import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { API_URL_ROOT } from "../../data/constants";
import { getData, TOKEN } from "../../utils/Storage";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductBuyButton(props) {
  const product = props.product;
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState("1");
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
          product_id: product.id,
          type: "product",
          description: `Paid ${
            parseInt(quantity || "0") * product.price
          }$ on ${quantity} product${quantity > 1 ? "s" : ""} of ${
            product.title
          } with a price of ${product.price} each`,
          amount: product.price * 100,
          name: product.title,
        },
        {
          headers: {
            Authorization: getData(TOKEN),
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        window.location.href = res.data;
      })
      .catch(() => {
        navigate(
          `/message?text=An error occured while paying&style=danger&next=/products/${product.category}`
        );
        setLoading(false);
      });
  };

  return (
    <div className="mx-auto">
      <button onClick={handleClickOpen} className="btn btn-secondary">
        buy now
      </button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle className="text-center dialog-title">
          Select quantity for <strong>{product.title}</strong>
        </DialogTitle>
        <TextField
          className="m-2"
          label="quantity"
          type="numnber"
          value={quantity}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
        <button className="btn btn-success m-2 dialog-btn" onClick={submit}>
          {loading ? (
            <CircularProgress size={40} color="inherit" />
          ) : (
            <p className="m-0 p-0">confirm payment</p>
          )}
        </button>
        <p className="m-2 dialog-price">
          total price : {parseInt(quantity || "0") * product.price} $
        </p>
      </Dialog>
    </div>
  );
}
