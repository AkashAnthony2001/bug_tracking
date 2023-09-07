import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
// import ActionComponent from "./ActionComponent";

export default function UserCard({ userData, setCorrect, load }) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: "1rem" }}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            User
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Name  :  { userData.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            UserName  :  { userData.username}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Role  :  { userData.role}
          </Typography>
        </CardContent>
        <CardActions>
        {/* <ActionComponent userData={userData} setCorrect={setCorrect} load={load}/> */}
      </CardActions>
      </CardActionArea>
    </Card>
  );
}
