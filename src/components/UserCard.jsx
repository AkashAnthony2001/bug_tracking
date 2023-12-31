import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

export default function UserCard({ userData, setCorrect, load }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleEdit = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    setOpenDelete(true);
  };
  const cardStyle = {
    marginTop: "10px",
    minWidth: 275,
    marginBottom: "1rem",
    backgroundColor: "#F8F9FA",
    boxShadow: "0 4px 6px rgba(0, 0, 0.1, 0.1)",
    borderRadius: "8px",
  };

  return (
    <Grid >
      <Card sx={cardStyle}>
        <CardActionArea>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ fontSize: 15, marginRight: "16px" }}
                color="text.secondary"
              >
                User :
              </Typography>
              <Typography variant="body1">{userData.name}</Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ fontSize: 15, marginRight: "16px" }}
                color="text.secondary"
              >
                User Name :
              </Typography>
              <Typography variant="body1">{userData.username}</Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ fontSize: 15, marginRight: "16px" }}
                color="text.secondary"
              >
                Role :
              </Typography>
              <Typography  variant="body1">{userData.role}</Typography>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleEdit}>
              Edit
            </Button>
            <EditUser
              userData={userData}
              open={open}
              setOpen={setOpen}
              load={load}
            />
            <Button size="small" onClick={handleDelete}>
              Delete
            </Button>
            <DeleteUser
              load={load}
              setCorrect={setCorrect}
              userData={userData}
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
            />
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
