import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiService from "../services/apiService";
import CustomizedSnackbars from "./CustomizedSnackbars";

function EditUser({ userData, load, open, setOpen}) {
  const [editErr, setEditErr] = useState([]);
  const [editedName, setEditedName] = useState("");
  const [editedUserName, setEditedUserName] = useState("");
  const [editedRole, setEditedRole] = useState("");

  useEffect(() => {
    setEditedName(userData.name);
    setEditedUserName(userData.username);
    setEditedRole(userData.role);
  }, []);

  const handleSubmit = async () => {
    const usersObj = {
      name: editedName,
      username: editedUserName,
      role: editedRole,
      id: userData._id,
    };
      load()
    let res = await apiService.editUser(usersObj.id,usersObj);
    setEditErr(res);
    if (res) {
      load()
      setOpen(false);
    }
    setEditedName(usersObj.name);
    setEditedUserName(usersObj.username);
    setEditedRole(usersObj.role);
    console.log(usersObj);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (editErr.error) {
    return (
      <>
        <CustomizedSnackbars error={editErr.error} message={editErr.message} />
      </>
    );
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter User Data"
            type="text"
            fullWidth
            variant="standard"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Enter new Project Description"
            type="email"
            fullWidth
            variant="standard"
            value={editedUserName}
            onChange={(e) => setEditedUserName(e.target.value)}
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
    </div>
  )
}

export default EditUser
