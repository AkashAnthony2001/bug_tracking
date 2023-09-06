import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModuleDialogue from "./ModuleDialogue";
import apiService from "../services/apiService";
import EditModule from "./EditModule";
import DeleteConfirmationDialog from "./DeleteDialogue";
import CustomizedSnackbars from "../components/CustomizedSnackbars";

export default function Module() {
  const [moduleData, setModuleData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [moduleIdDelete, setModuleIdToDelete] = useState("");
  const [deleteErr, setDeleteErr] = useState("");
  const [editedErr, setEditedErr] = useState("");
  const loadModules = async () => {
    const data = await apiService.getModule();
    setModuleData(data);
    console.log(data, "res");
  };

  useEffect(() => {
    loadModules();
  }, []);
  const handleDelete = async () => {
    const deletedModule = await apiService.deleteModule(moduleIdDelete);
    if (deletedModule.error) {
      setDeleteErr(deletedModule);
    } else {
      setDeleteDialogOpen(false);
    }
  };

  if (deleteErr.error) {
    return (
      <>
        <CustomizedSnackbars
          error={deleteErr.error}
          message={deleteErr.message}
          setChangemsg={setDeleteErr}
        />
      </>
    );
  }

  const handleUpdate = async () => {
    const result = await apiService.editModuledata(editData._id, editData);
    if (result.error) {
      setEditedErr(result);
    } else {
      setEditDialogOpen(false);
    }
  };

  if (editedErr.error) {
    return (
      <>
        <CustomizedSnackbars
          error={editedErr.error}
          message={editedErr.message}
          setChangemsg={setEditedErr}
        />
      </>
    );
  }

  const handleEditClick = (value) => {
    setEditData(value);
    setEditDialogOpen(true);
  };
  const handleDeleteClick = (moduleId) => {
    setDeleteDialogOpen(true);
    setModuleIdToDelete(moduleId);
  };
  return (
    <>
      <div>
        <ModuleDialogue loadData={() => loadModules()} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Module Title</TableCell>
                <TableCell>Module Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {moduleData?.map((module) => (
                <TableRow key={module._id}>
                  <TableCell>{module.module_name}</TableCell>
                  <TableCell>{module.module_description}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEditClick(module)}
                      // variant="outlined"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDeleteClick(module._id)}
                      // variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <EditModule
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          // setOpen={setEditDialogOpen}
          editData={editData}
          setEditData={setEditData}
          onSubmit={handleUpdate}
        />
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onDeleteConfirm={handleDelete}
        />
      </div>
    </>
  );
}
