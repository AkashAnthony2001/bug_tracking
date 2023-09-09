import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import apiService from "../services/apiService";

export default function ModuleDialogue({ loadData }) {
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [titleError, setTitleError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    setTitleError("");
    let isValid = true;
    if (!moduleTitle.trim()) {
      setTitleError("Module Title is required");
      isValid = false;
    }
    if (!isValid) {
      return;
    }
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
      setModuleDesc("");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} size="small">
        Add Module
      </Button>
      <Dialog open={open} onClose={handleClose} 
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px",
        },
      }}>
        <DialogTitle  style={{ background: "rgb(25,118,210)", color: "white" }}>Create Module</DialogTitle>
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
            error={!!titleError}
            helperText={titleError}
          />
          <TextField
            margin="dense"
            id="name"
            label="Module Description"
            type="description"
            fullWidth
            variant="standard"
            value={moduleDesc}
            onChange={(e) => setModuleDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}