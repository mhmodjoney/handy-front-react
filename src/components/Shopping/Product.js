import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";

export default function Product(props) {
  const product = props.product;
  const [showmore, setShowmore] = useState(false);
  return (
    <div className="col p-0 m-0">
      <Card className="product my-2 mx-auto">
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image={product.thumbnail}
            alt={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: showmore ? 99999 : 1,
              }}
            >
              {product.description}
            </Typography>
            <div className="d-flex justify-content-center">
              <IconButton
                onClick={() => {
                  setShowmore(!showmore);
                }}
              >
                {showmore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </div>
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
            <Typography gutterBottom variant="p" component="div" color="grey">
              in stokc : {product.stock}
            </Typography>
            <CardActions>
              <button className="btn btn-secondary mx-auto">buy now</button>
            </CardActions>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
