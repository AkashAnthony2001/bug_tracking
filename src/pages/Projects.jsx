import React from "react";
import { useState, useEffect } from "react";
import apiService from "../services/apiService";
import ProjectCard from "../components/ProjectCard";
import ProjectPage from "../components/ProjectPage";
import Button from "@mui/material/Button";
import FormDialog from "../components/FormDialog";
import DeleteProject from "../components/ActionComponent";

const ProjectList = ({ projects, handleClick, setCorrect,load }) => {
  return (
    <>
      {projects.length ? projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          handleClick={handleClick}
          setCorrect={setCorrect}
          load={load}
        />
      )):"No Projects Found"}
    </>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [correct, setCorrect] = useState(false);

  const handleProjects = async () => {
    const result = await apiService.getProjects();
    setProjects(result);
    // console.log(result,"res")
  };

  useEffect(() => {
    handleProjects();
  }, [correct]);

  const [openProject, setOpenProject] = useState({ open: false, id: null });

  const handleOpenProject = (id = null) => {
    setOpenProject({
      open: !openProject.open,
      id: id,
    });
  };

  return (
    <>
      <div>
        <FormDialog  setCorrect={setCorrect} />
        {openProject.open ? (
          <ProjectPage
            project={projects.find((proj) => proj._id === openProject.id)}
            handleClick={handleOpenProject}
            load={handleProjects()}
          />
        ) : (
          <ProjectList
            projects={projects}
            handleClick={handleOpenProject}
            setCorrect={setCorrect}
            load={handleProjects}
          />
        )}
      </div>
    </>
  );
};

export default Projects;
