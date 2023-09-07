import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiService from "../services/apiService";

export default function ModuleDialogue({ loadData }) {
  const [moduleTitle, setModuleTitle] = useState();
  const [moduleDesc, setModuledesc] = useState();
  const [open, setOpen] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitleError("");
    setDescError("");
  };

  const handleSubmit = async () => {
    const isTitleValid = validateTitle(moduleTitle);
    const isDescValid = validateDescription(moduleDesc);

    if (isTitleValid && isDescValid) {
      const moduledata = {
        module_name: moduleTitle,
        module_description: moduleDesc,
      };
      const result = await apiService.createModule(moduledata);
      console.log(result);
      if (result) {
        setOpen(false);
        loadData();
        setModuleTitle("");
        setModuledesc("");
      }
    }
  };
  const validateTitle = (title) => {
    if (!title.trim()) {
      setTitleError("Module Title is required");
      return false;
    }
    setTitleError(""); 
    return true;
  };
  
  const validateDescription = (desc) => {
    if (!desc.trim()) {
      setDescError("Module Description is required");
      return false;
    }
    setDescError("");
    return true;
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Module</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="moduleTitle"
            label="Module Title"
            fullWidth
            variant="standard"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            error={!!titleError}
            helperText={titleError}
          />
          <TextField
            margin="dense"
            id="moduleDesc"
            label="Module Description"
            fullWidth
            variant="standard"
            value={moduleDesc}
            onChange={(e) => setModuledesc(e.target.value)}
            error={!!descError}
            helperText={descError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
