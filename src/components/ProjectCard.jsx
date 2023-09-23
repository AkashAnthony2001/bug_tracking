import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ActionComponent from "./ActionComponent";
import { CardActionArea, CardActions, Grid } from "@mui/material";

export default function ProjectCard({ project, setCorrect, load }) {
  const cardStyle = {
    backgroundColor: "#F8F9FA",
    boxShadow: "0 4px 6px rgba(0, 0, 0.1, 0.1)",
    borderRadius: "8px",
    height: "100%",
    width: "350px",
    display: "flex",
    margin: "20px",
    marginBottom: "1rem",
    flexDirection: "column",
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}> 
<Card sx={{ ...cardStyle }}>
<CardActionArea>

        <CardContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 15, marginRight: "16px" }} color="text.secondary">
              Project Name:
            </Typography>
            <Typography >{project.title}</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 15, marginRight: "16px" }} color="text.secondary">
              Project Description:
            </Typography>
            <Typography variant="body1">{project.description}</Typography>
          </div>
        </CardContent>
        </CardActionArea>


        <CardActions>
          <ActionComponent project={project} setCorrect={setCorrect} load={load} />
        </CardActions>
      </Card>
    </Grid>
  );
}
