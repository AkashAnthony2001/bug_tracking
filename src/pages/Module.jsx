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
  const [Mtitle, setMtitle] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [id, setId] = useState("");
  const [deleteErr, setDeleteErr] = useState("");
  const [editedErr, setEditedErr] = useState("");

  const Moduledisplay = async () => {
    try {
      const data = await apiService.getModule();
      setMtitle(data);
      console.log(data, "res");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDelete = async () => {
    const delmodule = await apiService.deleteModule(id);
    setDeleteErr(delmodule);
    console.log(deleteErr);
    setMtitle(delmodule);
    setDeleteDialogOpen(false);
    console.log(delmodule, "res");
  };
  const handleUpdate = async () => {
    const result = await apiService.editModuledata(editData._id, editData);
    setEditedErr(result);
    console.log(editedErr);
    console.log(editData);
    if (result) {
      setEditDialogOpen(false);
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
  useEffect(() => {
    Moduledisplay();
  }, []);

  if (editedErr.error || deleteErr.error) {
    return (
      <>
        <CustomizedSnackbars
          error={editedErr.error || deleteErr.error}
          message={editedErr.error || deleteErr.message}
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
                      // variant="outlined"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDeleteClick(moduledata._id)}
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
