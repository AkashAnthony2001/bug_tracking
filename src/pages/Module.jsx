import React, { useState, useEffect } from "react";
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
import ModuleCustomizedSnackbars from "./ModuleCustomized";

export default function Module() {
  const [Mtitle, setMtitle] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [id, setId] = useState("");
  const [editedError, setEditedError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const Moduledisplay = async () => {
    try {
      const data = await apiService.getModule();
      setMtitle(data);
    } catch (error) {
      console.error("Error fetching module data:", error);
    }
  };

  useEffect(() => {
    Moduledisplay();
  }, []);

  const handleDelete = async () => {
    try {
      const delmodule = await apiService.deleteModule(id);
      if (delmodule.error) {
        setDeleteError(delmodule); 
      } else {
        setDeleteDialogOpen(false);
        Moduledisplay();
      }
    } catch (error) {
      setDeleteError(error); 
      
    }
  };
  
  const handleUpdate = async () => {
    try {
      const result = await apiService.editModuledata(editData._id, editData);
      if (result.error) {
        setEditedError(result);
      } else {
        setEditDialogOpen(false);
      }
    } catch (error) {
    }
  };
  const handleEditClick = (value) => {
    setEditData(value);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (value) => {
    setDeleteDialogOpen(true);
    setId(value);
  };

  if (editedError.error || deleteError.error) {
    return (
      <>
        <ModuleCustomizedSnackbars
          error={editedError.error || deleteError.error}
          message={editedError.message || deleteError.message}
        />
      </>
    );
  }
  
  return (
    <>
      <div>
        <ModuleDialogue loadData={() => Moduledisplay()} />
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
              {Mtitle?.map((moduledata) => (
                <TableRow key={moduledata._id}>
                  <TableCell>{moduledata.module_name}</TableCell>
                  <TableCell>{moduledata.module_description}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEditClick(moduledata)}
                      variant="outlined"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDeleteClick(moduledata._id)}
                      variant="outlined"
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
          setOpen={setEditDialogOpen}
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
