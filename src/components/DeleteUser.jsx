import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useState } from 'react';
import apiService from "../services/apiService";
import CustomizedSnackbars from "./CustomizedSnackbars";

function DeleteUser({ userData, setCorrect, load, openDelete, setOpenDelete}) {
    const [usererr, setUserErr] = useState([]);
  const handleDelete = async () => {
    
    let res = await apiService.deleteUser(userData._id);
    setUserErr(res);
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
  if (usererr.error) {
    return (
      <>
        <CustomizedSnackbars error={usererr.error} message={usererr.message} />
      </>
    );
  }
  return (
    <div>
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to Delete this User"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteUser
