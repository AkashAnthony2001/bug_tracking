import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import apiService from "../services/apiService";
import CustomizedSnackbars from "./CustomizedSnackbars";

function DeleteDialog({ item, openDelete, setOpenDelete, setCorrect }) {
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
  };
  if (err.error) {
    return (
      <>
        <CustomizedSnackbars error={err.error} message={err.message} />
      </>
    );
  }
  return (
    <div>
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to Delete this Project"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
