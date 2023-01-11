import React, { useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ProductDialog(props) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/${props.productId}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="mx-auto">
      <Dialog onClose={props.handleClose} open={props.open}>
        <DialogTitle className={loading ? "" : "text-center dialog-title"}>
          {loading ? <CircularProgress size={40} /> : <>{product.title}</>}
        </DialogTitle>

        {!loading ? (
          <div className="container">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="mx-auto d-table dialog-title"
              height="300px"
            ></img>
            <p className="text-muted">{product.description}</p>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="d-flex">
                <StarIcon className="rate" />
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  className="rate"
                >
                  {product.rating}
                </Typography>
              </div>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="price bg-success rounded p-1 text-light"
              >{`${product.price}$`}</Typography>
            </div>
            <p className="text-muted">in stock : {product.stock}</p>
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}
