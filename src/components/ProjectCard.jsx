import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteProject from "./ActionComponent";
import ActionComponent from "./ActionComponent";

export default function ProjectCard({
  project,
  handleClick,
  setCorrect,
  load,
}) {


  const cardStyle = {
    marginTop: "10px",
    minWidth: 275,
    marginBottom: "1rem",
    backgroundColor: "#fdfdfd", 
    boxShadow: "0 4px 6px rgba(0, 0, 0.1, 0.1)",
    borderRadius: "8px",
  };


  return (
    <Card sx={cardStyle}>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ fontSize: 15, marginRight: "16px" }}
            color="text.secondary"
          >
            Project Name :
          </Typography>
          <Typography variant="h6">{project.title}</Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ fontSize: 15, marginRight: "16px" }}
            color="text.secondary"
          >
            Project Description :
          </Typography>
          <Typography variant="h6">{project.description}</Typography>
        </div>
      </CardContent>
      <CardActions>
        <ActionComponent
          project={project}
          setCorrect={setCorrect}
          load={load}
        />
      </CardActions>
    </Card>
  );
}
