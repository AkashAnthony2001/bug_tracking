import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import apiService from "../services/apiService";

export default function EditModule({
  open,
  onClose,
  editData,
  setEditData,
  onSubmit
}) {



  const handleChange = (event) => {
    setEditData((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Module</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Module Title"
            type="title"
            name="module_name"
            fullWidth
            variant="standard"
            value={editData?.module_name}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Module Description"
            name="module_description"
            type="description"
            fullWidth
            variant="standard"
            value={editData?.module_description}
            onChange={(e) => handleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
