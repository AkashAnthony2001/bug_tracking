import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiService from "../services/apiService";

function EditDialog({ item, open, setOpen,load }) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  // const [close , setClose] = useState(false)

  // const handelChange = event => {
  //   setEditedTitle(event.target.value);
  //   setEditedDescription(event.target.value);
  // };
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

    const result = await apiService.editProject(projectObj);
    console.log(result);
    if (result) {
      load()
      setOpen(false);
    }
    setEditedTitle(projectObj.title);
    setEditedDescription(projectObj.description);
    console.log(projectObj);
  };
  //  console.log(openEditDialog,"open");
  const handleClose = () => {
    setOpen(false);
  };

  //  console.log(item, "trem");
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Project</DialogTitle>
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
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <DialogActions>
          <Button size="small" onClick={handleSubmit}>
            Save Change
          </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default EditDialog;
