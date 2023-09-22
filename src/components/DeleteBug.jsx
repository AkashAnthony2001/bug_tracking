import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import apiService from "../services/apiService";
import CustomizedSnackbars from "./CustomizedSnackbars";
import { useNavigate } from "react-router-dom";

function DeleteBug({ data , hash }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [delrerr, setdelErr] = useState("");

  const navigate = useNavigate();
  const handelDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleDelete = async () => {
    let res =await apiService.deleteBug(data._id);
    setdelErr(res) ;
    if(res.message === "Bug Deleted "){
      navigate(
        hash === "#bugs"
          ? "/dashboard/bugs"
          : hash === "#submitted"
          ? "/dashboard/submitted"
          : "/dashboard/assigned"
      )
    }
    setOpenDialog((prev)=>!prev);
  };
  return (
    <>
      <Button onClick={handelDialog}>Delete</Button>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: "#398EED", color: "white" }}>
          Delete Module Data
        </DialogTitle>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to Delete this Bug"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars error={delrerr.error} message={delrerr.message} />
    </>
  );
}

export default DeleteBug;
