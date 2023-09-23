import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";
import ProjectCard from "../components/ProjectCard";
import FormDialog from "../components/FormDialog";
import { Typography, Grid,  } from "@mui/material";

const ProjectList = ({ projects, setCorrect, load }) => {
  return (
    <>
      {projects.length ? (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid  key={project._id}>
              <ProjectCard
                project={project}
                setCorrect={setCorrect}
                load={load}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ textAlign: "center" }} variant="h5">
          No Projects Found
        </Typography>
      )}
    </>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [correct, setCorrect] = useState(false);

  const handleProjects = async () => {
    try {
      const result = await apiService.getProjects();
      setProjects(result);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    handleProjects();
  }, [correct]);

  return (
    <div>
      <FormDialog setCorrect={setCorrect} />

      <ProjectList
        projects={projects}
        setCorrect={setCorrect}
        load={handleProjects}
      />
    </div>
  );
};

export default Projects;
