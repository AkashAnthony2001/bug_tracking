import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiService from "../services/apiService";
import CustomizedSnackbars from "./CustomizedSnackbars";

export default function FormDialog({ setCorrect }) {
  const [title, setTitle] = useState("");
  const [description, setDescriptin] = useState("");
  const [open, setOpen] = useState(false);
  const [create, setCreate] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    const projectObj = {
      title: title,
      description: description,
    };
    const result = await apiService.createProject(projectObj);
    setCreate(result);
    if (result) {
      setOpen(false);
      setCorrect((prev) => !prev);
      setDescriptin("");
      setTitle("");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Project Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Enter Project Description"
            type="email"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescriptin(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars error={create?.error} message={create?.message} setChangemsg={setCreate}/>
    </div>
  );
}
