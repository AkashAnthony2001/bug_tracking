import React, { useState } from "react";
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
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [create, setCreate] = useState({});
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleSubmit = async () => {
    if (!title) {
      setTitleError(true);
      return;
    } else {
      setTitleError(false);
    }
    if (!description) {
      setDescriptionError(true);
      return;
    } else {
      setDescriptionError(false);
    }

    const projectObj = {
      title: title,
      description: description,
    };
    const result = await apiService.createProject(projectObj);
    setCreate(result);
    if (result) {
      setOpen(false);
      setCorrect((prev) => !prev);
      setDescription("");
      setTitle("");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} size="small">
        Create Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle style={{ background: "rgb(25,118,210)", color: "white" }}>
          Create New Project
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="title"
            label="Enter Project Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={titleError}
            helperText={titleError ? "Title is required" : ""}
          />
          <TextField
            margin="dense"
            id="description"
            label="Enter Project Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={descriptionError}
            helperText={descriptionError ? "Description is required" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars
        error={create?.error}
        message={create?.message}
        setChangemsg={setCreate}
      />
    </div>
  );
}
