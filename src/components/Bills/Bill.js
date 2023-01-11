import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import BillPayButton from "./BillPayButton";
export default function Bill(props) {
  return (
    <div className="col p-0 m-0" key={props.name}>
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
          <CardActions>
            <BillPayButton name={props.name} />
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  );
}
