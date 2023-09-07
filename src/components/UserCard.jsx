import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

export default function UserCard({  userData, setCorrect, load }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState("")
  const handleEdit = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    setOpenDelete(true);
    setId()
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: "1rem" }}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            User
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Name : {userData.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            UserName : {userData.username}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Role : {userData.role}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEdit}>
            Edit
          </Button>
          <EditUser userData={userData} open={open} setOpen={setOpen} load={load} />
          <Button size="small" onClick={handleDelete}>
            Delete
          </Button>
          <DeleteUser load={load} setCorrect={setCorrect} userData={userData} openDelete={openDelete} setOpenDelete={setOpenDelete}/>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
