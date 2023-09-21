import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";
import EditModule from "./EditModule";
import DeleteConfirmationDialog from "./DeleteDialogue";
import ModuleCustomizedSnackbars from "./ModuleCustomized";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import ModuleDialogue from "./ModuleDialogue";

export default function ModuleDemo() {
  const [Mtitle, setMtitle] = useState([]);
  const [editedError, setEditedError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState("");
  const [eid, setEid] = useState("");

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

  const handleEdit = (eid) => {
    setOpen(true);
    setEid(eid);
  };
  const handleDelete = (mid) => {
    setOpenDelete(true);
    setId(mid);
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
  const cardStyle = {
    marginTop: "10px",
    minWidth: 275,
    marginBottom: "1rem",
    backgroundColor: "#F1F6F9", 
    boxShadow: "0 4px 6px rgba(0, 0, 0.1, 0.1)",
    borderRadius: "8px",
  };

  return (
    <>
      <div>
        <ModuleDialogue loadData={() => Moduledisplay()} />

        {Mtitle?.map((moduledata) => (
          <Card sx={cardStyle}>
            <CardActionArea>
              <CardContent>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{ fontSize: 15, marginRight: "16px" }}
                    color="text.secondary"
                  >
                    Module Name :
                  </Typography>
                  <Typography variant="h6">{moduledata.module_name}</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{ fontSize: 15, marginRight: "16px" }}
                    color="text.secondary"
                  >
                    Module Description :
                  </Typography>
                  <Typography variant="h6">
                    {moduledata.module_description}
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(moduledata)}>
                  Edit
                </Button>

                <Button
                  size="small"
                  onClick={() => handleDelete(moduledata._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        ))}

        <EditModule
          setOpen={setOpen}
          load={Moduledisplay}
          open={open}
          moduledata={eid}
        />
        <DeleteConfirmationDialog
          load={Moduledisplay}
          moduledata={id}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
        />
      </div>
    </>
  );
}
