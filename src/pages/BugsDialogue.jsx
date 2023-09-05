import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import apiService from "../services/apiService";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function BugsDialogue() {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState([]);
  const [projectName, setprojectName] = useState([]);
  const [module, setModule] = useState([]);
  const [assigned, setAssigned] = useState([]);
  // const [bug, setBug] = useState([]);
  const [report, setReport] = useState([]);
  const [createby, setCreatedby] = useState([]);
  const [date, setDate] = useState("");
  const [bugData, setBugData] = useState({
    bug_description: "",
    bug_type: "",
    severity: "",
    sprint: "",
    moduleId: "",
    projectId: "",
    assignedTo: "",
    reportedBy: "",
    createdby: "",
    status: "",
    estimate_date: "",
    customerfound: "",
    bug_id: "",
  });

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const bugDisplay = async () => {
    const data = await apiService.getBugs();
    // setBugData(data);
    // console.log(data, "res");
    const statusData = await apiService.getStatus();
    setSelectedStatus(statusData);
    const record = await apiService.getProjects();
    setprojectName(record);
    const moduledata = await apiService.getModule();
    setModule(moduledata);
    const assignedData = await apiService.getUsers();
    setAssigned(assignedData);
    // const bugData = await apiService.getBugs();
    // setBug(bugData);
    const reportdata = await apiService.getUsers();
    setReport(reportdata);
    const createdata = await apiService.getUsers();
    setCreatedby(createdata);
  };
  const getStatus = async (event, rowid) => {
    console.log(event.target.value, rowid);

    await apiService.putStatus(event, rowid);
  };

  const handleCreateBug = async () => {
    console.log(date, "date");
    let data = {
      ...bugData,
      estimate_date: date,
    };
    try {
      const result = await apiService.createBugs(data);
      console.log(result);

      setOpen(false);
    } catch (error) {
      console.error("Error creating bug:", error);
    }
  };
  const secondApi = async () => {
    const res = await apiService.generateBug(bugData._id);
    console.log(res);
  };

  useEffect(() => {
    bugDisplay();
  }, []);
  return (
    <>
      <Button variant="outlined" onClick={handleOpenDialog}>
        Create Bug
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Create Bugs</DialogTitle>
        <DialogContent>
          <Grid container style={{ marginTop: "5px" }} spacing={2}>
            {/* project name dialogbox */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="project-name-label">Project name</InputLabel>
                <Select
                  label="Project Name"
                  value={bugData.projectId}
                  onChange={(event) =>
                    setBugData(
                      { ...bugData, projectId: event.target.value },
                      () => secondApi(event.target.value)
                    )
                  }
                >
                  {projectName.map((projectdata) => (
                    <MenuItem key={projectdata._id} value={projectdata._id}>
                      {projectdata.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <br />
            <br />
            {/* bug id dialogue */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  label="Bug Id"
                  variant="outlined"
                  value={bugData.bug_id}
                  onChange={(event) =>
                    setBugData({ ...bugData, bug_id: event.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <br />
            <br />
            {/* bug_description dialogbox */}
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Bug Description"
                multiline
                fullWidth
                style={{ marginTop: "10px" }}
                size="small"
                rows={2}
                defaultValue=""
                value={bugData.bug_description}
                variant="outlined"
                onChange={(event) =>
                  setBugData({
                    ...bugData,
                    bug_description: event.target.value,
                  })
                }
              />
            </Grid>
            <br />
            <br />

            {/* Bug Type dialogbox */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="bug-type-label">Bug Type</InputLabel>
                <Select
                  label="Bug Type"
                  value={bugData.bug_type}
                  onChange={(event) =>
                    setBugData({ ...bugData, bug_type: event.target.value })
                  }
                >
                  <MenuItem value="Bug"> Bug</MenuItem>
                  <MenuItem value="CR">CR</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <br />
            <br />

            {/* module name dialog box */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="module-name-label">Module name</InputLabel>
                <Select
                  label="Project Name"
                  value={bugData.moduleId}
                  onChange={(event) =>
                    setBugData({ ...bugData, moduleId: event.target.value })
                  }
                >
                  {module.map((moduledatas) => (
                    <MenuItem key={moduledatas._id} value={moduledatas._id}>
                      {moduledatas.module_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <br />
            <br />

            {/* assigned name dialog box */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="assigned-to-label">Assigned To</InputLabel>
                <Select
                  label="Assigned To"
                  value={bugData.assignedTo}
                  onChange={(event) =>
                    setBugData({ ...bugData, assignedTo: event.target.value })
                  }
                >
                  {assigned.map((assignedvalues) => (
                    <MenuItem
                      key={assignedvalues._id}
                      value={assignedvalues._id}
                    >
                      {assignedvalues.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <br />
            <br />
            {/* Reported by dialogbox */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="reported-by-label">Reported By</InputLabel>
                <Select
                  label="Reported By"
                  value={bugData.reportedBy}
                  onChange={(event) =>
                    setBugData({ ...bugData, reportedBy: event.target.value })
                  }
                >
                  {report.map((reportby) => (
                    <MenuItem key={reportby._id} value={reportby._id}>
                      {reportby.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <br />
            <br />
            {/* created by dialogbox */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="created-by-label">Created By</InputLabel>
                <Select
                  label="Created By"
                  value={bugData.createdby}
                  onChange={(event) =>
                    setBugData({ ...bugData, createdby: event.target.value })
                  }
                >
                  {createby.map((createdatas) => (
                    <MenuItem key={createdatas._id} value={createdatas._id}>
                      {createdatas.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <br />
            <br />
            {/* Serviertiy dialog box */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="bug-type-label">Serviertiy</InputLabel>
                <Select
                  label="Status"
                  value={bugData.severity}
                  onChange={(event) =>
                    setBugData({
                      ...bugData,
                      severity: event.target.value,
                    })
                  }
                >
                  <MenuItem value="Minor"> Minor</MenuItem>
                  <MenuItem value="Major">Major</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Blocker"> Blocker</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <br />
            <br />
            {/* customer found dialog box */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="bug-type-label">Customer Found</InputLabel>
                <Select
                  label="Customer Found"
                  value={bugData.customerfound}
                  onChange={(event) =>
                    setBugData({
                      ...bugData,
                      customerfound: event.target.value,
                    })
                  }
                >
                  <MenuItem value={true}> Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <br />
            <br />
            {/* estimate date dailog */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="estimate_date"
                      value={date || null}
                      onChange={(value) => {
                        console.log(value.$d);
                        console.log(value.$d.toLocaleDateString("en-CA"));
                        setDate(value.$d.toLocaleDateString("en-CA"));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>
            </Grid>
            {/* status dialogbox */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="bug-type-label">Status</InputLabel>
                <Select
                  label="Status"
                  value={bugData.status}
                  onChange={(event) =>
                    setBugData({ ...bugData, status: event.target.value })
                  }
                >
                  <MenuItem value="Opened">Opened</MenuItem>
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="InProgress">InProgress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Testing">Testing</MenuItem>
                  <MenuItem value="Verified">Verified</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                  <MenuItem value="Hold">Hold</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br />
            <br />
            {/* Sprint dialog box */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  type="number"
                  label="Sprint"
                  variant="outlined"
                  value={bugData.sprint}
                  onChange={(event) =>
                    setBugData({ ...bugData, sprint: event.target.value })
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateBug} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
