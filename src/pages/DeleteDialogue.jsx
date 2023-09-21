
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import apiService from "../services/apiService";
import CustomizedSnackbars from "../components/CustomizedSnackbars";


const DeleteConfirmationDialog = ({ moduledata, load, openDelete, setOpenDelete }) => {
  const [delrerr, setdelErr] = useState([]);
  
  const handleDelete = async () => {
    let res = await apiService.deleteModule(moduledata);
    setdelErr(res) ;
    if (res) {
      load()
    }
    setOpenDelete((prev)=>!prev);
  };
  const handleClose = () => {
    setOpenDelete(false);
    load()
    setOpenDelete(false);
  };
 
  return (
    <>
    <Dialog open={openDelete} onClose={handleClose}>
      <DialogTitle style={{ backgroundColor:"#398EED", color: "white" }}>
        Delete Module Data
        </DialogTitle>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to Delete this Module"}
        </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    <CustomizedSnackbars error={delrerr.error} message={delrerr.message} />
    </>
  );
};

export default DeleteConfirmationDialog;