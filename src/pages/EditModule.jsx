import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiService from "../services/apiService";
import CustomizedSnackbars from "../components/CustomizedSnackbars";

function EditModule({ moduledata, load, open, setOpen }) {
  const [editErr, setEditErr] = useState("");
  const [editedModuleName, setEditedModuleName] = useState("");
  const [editedModuleDes, setEditedModuleDes] = useState("");
  const [moduleNameError, setmoduleNameError] = useState("");
  const [moduleDesError, setmoduleDesError] = useState("");
console.log(moduledata,'fer')
  useEffect(() => {
    if(moduledata){

      setEditedModuleName(moduledata.module_name);
      setEditedModuleDes(moduledata.module_description);
    }
  }, [moduledata]);

  const handleSubmit = async () => {
    const moduleObj = {
      module_name: editedModuleName,
      module_description: editedModuleDes
    };
    load();
    
    if (!editedModuleName) {
      setmoduleNameError({ error: true, message: "Module Name is required" });
      return;
    } else {
      setmoduleNameError({ error: false, message: "" });
    }
    if (!editedModuleDes) {
      setmoduleDesError({ error: true, message: "Module Description is required" });
      return;
    }else {
      setmoduleDesError({ error: false, message: "" });
    }

    let res = await apiService.editModuledata(moduledata._id, moduleObj);
    setEditErr(res);
    if (res) {
      load();
      setOpen(false);
    }
    setEditedModuleName(moduleObj.module_name);
    setEditedModuleDes(moduleObj.module_description);
    console.log(moduleObj);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor:"#596e79", color: "white" }}>
        Edit Module Data
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter new Module Name"
            type="text"
            fullWidth
            variant="standard"
            value={editedModuleName}
            error={moduleNameError.error}
            helperText={moduleNameError.error ? moduleNameError.message : ""}
            onChange={(e) => setEditedModuleName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Enter new UserName"
            type="email"
            fullWidth
            variant="standard"
            value={editedModuleDes}
            error={moduleDesError.error}
            helperText={moduleDesError.error ? moduleDesError.message : ""}
            onChange={(e) => setEditedModuleDes(e.target.value)}
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

export default EditModule;
