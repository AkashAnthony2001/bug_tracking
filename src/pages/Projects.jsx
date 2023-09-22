import React from "react";
import { useState, useEffect } from "react";
import apiService from "../services/apiService";
import ProjectCard from "../components/ProjectCard";
import FormDialog from "../components/FormDialog";
import { Typography } from "@mui/material";

const ProjectList = ({ projects, setCorrect,load }) => {
  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr ", 
    gap: "1rem", 
  };
  return (
    <>
     {projects.length ? (
        <div style={gridContainerStyle}>
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              setCorrect={setCorrect}
              load={load}
            />
          ))}
        </div>
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
    const result = await apiService.getProjects();
    setProjects(result);
  };

  useEffect(() => {
    handleProjects();
  }, [correct]);
 
  return (
    <>
      <div>
        <FormDialog  setCorrect={setCorrect} />
       
      
          <ProjectList
            projects={projects}
            setCorrect={setCorrect}
            load={handleProjects}
          />
      
      </div>
    </>
  );
};

export default Projects;
