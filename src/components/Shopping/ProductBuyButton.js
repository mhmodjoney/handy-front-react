import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

export default function ProductBuyButton(props) {
  const product = props.product;
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState("1");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div className="mx-auto">
      <button onClick={handleClickOpen} className="btn btn-secondary">
        buy now
      </button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
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
        <button className="btn btn-success m-2">confirm payment</button>
        <p className="m-2">
          total price : {parseInt(quantity || "0") * product.price} $
        </p>
      </Dialog>
    </div>
  );
}
