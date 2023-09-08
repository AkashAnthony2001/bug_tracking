import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiService from "../services/apiService";
import CustomizedSnackbars from "./CustomizedSnackbars";
import { InputLabel, MenuItem, Select, Typography } from "@mui/material";

export default function demo({ setCorrect }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null)
  const [open, setOpen] = useState(false);
  const [create, setCreate] = useState({});
  const [nameError, setNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [roleError, setRoleErr] =  useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setUserName("");
    setPassword("");
    setRole("")
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value)
    // console.log(event.target.value);
  }

  const handleSubmit = async () => {
    setNameError("");
    setUserNameError("");
    setPasswordError("");
    if (!name) {
      setNameError("Title is required");
      return;
    }
    if (!userName) {
      setUserNameError("Description is required");
      return;
    }
    if (!password) {
      setPasswordError("Description is required");
      return;
    }
    if (!role) {
        setRoleErr("select your role");
        return;
    }

    const userObj = {
      name: name,
      username: userName,
      password: password,
      role: role
    };
    const result = await apiService.createUser(userObj);
    
    if (result) {
      setOpen(false);
      setCorrect((prev) => !prev);
      setName("");
      setUserName("");
      setPassword("");
      setRole(null);
    }
    setCreate(result);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Enter Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            margin="dense"
            id="description"
            label="Enter User Name"
            type="text"
            fullWidth
            variant="standard"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            error={!!userNameError}
            helperText={userNameError}
          />
          <TextField
            margin="dense"
            id="description"
            label="Enter Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            label="Role"
            id="role"
            fullWidth
            value={role}
            onChange={handleRoleChange}
            error={!!roleError}
            helperText={roleError}
          >
            <MenuItem value="developer">Developer</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
          {roleError && <Typography variant="caption" color="error">{roleError}</Typography>}
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
