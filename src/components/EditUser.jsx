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
  const [name, setName] = useState([]);
  const [username, setUserName] = useState([]);
  const [editErr, setEditErr] = useState([]);
  const [editedName, setEditedName] = useState("");
  const [editedUserName, setEditedUserName] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    setEditedName(userData.name);
    setEditedUserName(userData.username);
  }, []);

  const handleSubmit = async () => {
    const usersObj = {
      name: editedName,
      username: editedUserName,
      id: userData._id
    };
      load()
      if (!name) {
        setNameError("Name is required");
        return;
      }
      if (!username) {
        setUsernameError("UserName is required");
        return;
      }
    let res = await apiService.editUser(usersObj.id,usersObj);
    setEditErr(res);
    if (res) {
      load()
      setOpen(false);
    }
    setEditedName(usersObj.name);
    setEditedUserName(usersObj.username);
    console.log(usersObj);
  };
  const handleClose = () => {
    setName("");
    setUserName("")
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User Data</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter new Name"
            type="text"
            fullWidth
            variant="standard"
            value={editedName}
            error={!!nameError}
            helperText={nameError}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Enter new UserName"
            type="email"
            fullWidth
            variant="standard"
            value={editedUserName}
            error={!!usernameError}
            helperText={usernameError}
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
      <CustomizedSnackbars error={editErr?.error} message={editErr?.message} setChangemsg={setEditErr}  />
    </div>
  )
}

export default EditUser