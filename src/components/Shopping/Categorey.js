import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function Categorey(props) {
  return (
    <div className="col p-0 m-0">
      <Link to={`/products/${props.name}`} className="text-decoration-none">
        <Card className="categorey my-2 mx-auto">
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={props.image}
              alt={props.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
}
