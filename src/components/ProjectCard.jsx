import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteProject from "./ActionComponent";
import ActionComponent from "./ActionComponent";

export default function ProjectCard({ project, handleClick ,setCorrect,load}) {

  return (
    <Card sx={{ minWidth: 275, marginBottom: "1rem" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Project {project.id}
        </Typography>
        <Typography variant="h5" component="div">
          {project.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {project.description}
        </Typography>
      </CardContent>
      <CardActions>
        <ActionComponent project={project} setCorrect={setCorrect} load={load}/>
      </CardActions>
    </Card>
  );
}
