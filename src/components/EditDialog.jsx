import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiService from "../services/apiService";
import CustomizedSnackbars from "./CustomizedSnackbars";

function EditDialog({ item, open, setOpen,load }) {
  const [editErr, setEditErr] = useState([]);
  const [editedTitle, setEditedTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    setEditedTitle(item.title);
    setEditedDescription(item.description);
  }, []);
  const handleSubmit = async () => {
    const projectObj = {
      title: editedTitle,
      description: editedDescription,
      id: item._id,
    };
      load()
    
      if (!editedTitle) {
        setTitleError(true);
        return;
      } else {
        setTitleError(false);
      }
      if (!editedDescription) {
        setDescriptionError(true);
        return;
      } else {
        setDescriptionError(false);
      }

    let res = await apiService.editProject(projectObj);
    setEditErr(res);
    if (res) {
      load()
      setOpen(false);
    }
    setEditedTitle(projectObj.title);
    setEditedDescription(projectObj.description);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor:"#596e79", color: "white" }}>
        Edit Project
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter new Project Title"
            type="text"
            fullWidth
            variant="standard"
            value={editedTitle}
            error={titleError}
            helperText={titleError ? "Title is required" : ""}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Enter new Project Description"
            type="email"
            fullWidth
            variant="standard"
            value={editedDescription}
            error={descriptionError}
            helperText={descriptionError ? "Description is required" : ""}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <DialogActions>
          <Button size="small" onClick={handleClose}>
            Cancel
          </Button>
          <Button size="small" onClick={handleSubmit}>
            Save Change
          </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <CustomizedSnackbars error={editErr.error} message={editErr.message} />
    </div>
  );
}
export default EditDialog;
