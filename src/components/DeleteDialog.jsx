import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import apiService from "../services/apiService";


function DeleteDialog({ item, openDelete, setOpenDelete, setCorrect }) {
  
  const [err,setErr] = useState([]);
  const handleDelete = async () => {
    let res = await apiService.deleteProject(item._id);
    setErr(res.message)
    setCorrect((prev) => !prev);
  };
  const handleClose = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to Delete this Project"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
