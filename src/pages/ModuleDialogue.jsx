import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiService from "../services/apiService";

export default function ModuleDialogue({loadData}) {
  const [moduleTitle, setModuleTitle] = useState();
  const [moduleDesc, setModuledesc] = useState();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSubmit = async () => {
    const moduledata = {
      module_name: moduleTitle,
      module_description: moduleDesc,
    };
    const result = await apiService.createModule(moduledata);
    console.log(result);
    if (result) {
      setOpen(false);
      loadData();
      setModuleTitle('');
      setModuledesc('');
    }

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
            id="name" 
            label="Module Title"
            type="title"
            fullWidth
            variant="standard"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          <TextField
            
            margin="dense"
            id="name"
            label="Module Description"
            type="description"
            fullWidth
            variant="standard"
            value={moduleDesc}
            onChange={(e) => setModuledesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>create</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
