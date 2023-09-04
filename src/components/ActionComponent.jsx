import { React, useState } from "react";
import Button from "@mui/material/Button";
import apiService from "../services/apiService";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

function ActionComponent({ project, setCorrect, load }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // const handleDelete = async () => {
  //   let res = await apiService.deleteProject(project._id);

  //   setCorrect((prev) => !prev);
  // };

  // console.log(id);

  const handleEdit = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    setOpenDelete(true);
  };

  // console.log(openEditDailog,"state")

  return (
    <div>
      <Button size="small" onClick={handleEdit}>
        Edit
      </Button>

      <Button size="small" onClick={handleDelete}>
        Delete
      </Button>
      <DeleteDialog item={project} openDelete={openDelete} setOpenDelete={setOpenDelete} load={load} setCorrect={setCorrect} />
      <EditDialog item={project} open={open} setOpen={setOpen} load={load} />
    </div>
  );
}

export default ActionComponent;
