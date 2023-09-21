import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import apiService from "../services/apiService";
import CustomizedSnackbars from "./CustomizedSnackbars";

function DeleteDialog({ item, openDelete, setOpenDelete, setCorrect, load }) {
  const [err, setErr] = useState([]);
  const handleDelete = async () => {
    
    let res = await apiService.deleteProject(item._id);
    setErr(res);
    setCorrect((prev) => !prev);
    if (res) {
      setOpenDelete(false);
    }
  };
  const handleClose = () => {
    setOpenDelete(false);
    load()
    setOpenDelete(false);
  };

  return (
    <div>
      <Dialog open={openDelete} onClose={handleClose}>
      <DialogTitle style={{ backgroundColor:"#398EED", color: "white" }}>
        Delete Project
        </DialogTitle>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to Delete this Project"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars error={err.error} message={err.message} />
    </div>
  );
}

export default DeleteDialog;
