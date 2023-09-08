
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import apiService from "../services/apiService";
import CustomizedSnackbars from "../components/CustomizedSnackbars";


const DeleteConfirmationDialog = ({ moduledata, load, openDelete, setOpenDelete }) => {
  const [delrerr, setdelErr] = useState([]);
  
  const handleDelete = async () => {
    let res = await apiService.deleteModule(moduledata);
    setdelErr(res) ;
    console.log(moduledata)
    if (res) {
      load()
      setOpenDelete(false);
    }
  };
  const handleClose = () => {
    setOpenDelete(false);
    
    setOpenDelete(false);
  };
  if (delrerr.error) {
    return (
      <>
         <CustomizedSnackbars error={delrerr.error} message={delrerr.message} />
      </>
    );
  }
  return (
    <Dialog open={openDelete} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this module?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;