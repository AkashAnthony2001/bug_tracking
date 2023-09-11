import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiService from "../services/apiService";
import CustomizedSnackbars from "./CustomizedSnackbars";

function EditUser({ userData, load, open, setOpen }) {
  const [editErr, setEditErr] = useState("");
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
      id: userData._id,
    };
    load();
    
    if (!editedName) {
      setNameError({ error: true, message: "Name is required" });
      return;
    } else {
     setNameError({ error: false, message: "" });
    }
    if (!editedUserName) {
      setUsernameError({ error: true, message: "User Name is required" });
      return;
    }else {
      setUsernameError({ error: false, message: "" });
    }

    let res = await apiService.editUser(usersObj.id, usersObj);
    setEditErr(res);
    if (res) {
      load();
      setOpen(false);
    }
    setEditedName(usersObj.name);
    setEditedUserName(usersObj.username);
    console.log(usersObj);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor:"#596e79", color: "white" }}>
        Edit User Data
        </DialogTitle>
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
            error={nameError.error}
            helperText={nameError.error ? nameError.message : ""}
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
            error={usernameError.error}
            helperText={usernameError.error ? usernameError.message : ""}
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
      <CustomizedSnackbars
        error={editErr?.error}
        message={editErr?.message}
        setChangemsg={setEditErr}
      />
    </div>
  );
}

export default EditUser;
// import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import apiService from "../services/apiService";

// export default function EditModule({
//   open,
//   onClose,
//   editData,
//   setEditData,
//   onSubmit
// }) {



//   const handleChange = (event) => {
//     setEditData((prevValues) => ({
//       ...prevValues,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   return (
//     <div>
//       <Dialog open={open} onClose={onClose}>
//         <DialogTitle>Edit Module</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Module Title"
//             type="title"
//             name="module_name"
//             fullWidth
//             variant="standard"
//             value={editData?.module_name}
//             onChange={(e) => handleChange(e)}
//           />
//           <TextField
//             margin="dense"
//             id="name"
//             label="Module Description"
//             name="module_description"
//             type="description"
//             fullWidth
//             variant="standard"
//             value={editData?.module_description}
//             onChange={(e) => handleChange(e)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onSubmit}>Update</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }