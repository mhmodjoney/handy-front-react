import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function Categorey(props) {
  return (
    <div className="col p-0 m-0 mx-auto">
      <Card className="categorey my-2 mx-auto">
        <CardActionArea>
          <CardMedia
            className="img-fluid"
            component="img"
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
    </div>
  );
}
