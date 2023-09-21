import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ActionComponent from "./ActionComponent";

export default function ProjectCard({ project, setCorrect, load }) {
  const cardStyle = {
    marginTop: "10px",
    minWidth: 275,
    marginBottom: "1rem",
    backgroundColor: "#EDEDED",
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

        <ActionComponent
          project={project}
          setCorrect={setCorrect}
          load={load}
        />
      </Card>
  );
}
