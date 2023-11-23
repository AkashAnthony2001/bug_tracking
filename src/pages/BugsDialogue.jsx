import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Grid,
  FormHelperText,
  Box,
  Typography,
  FormLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import apiService from "../services/apiService";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function BugsDialogue({ loadData, bugStatus }) {
  const [open, setOpen] = useState(false);
  const [projectName, setprojectName] = useState([]);
  const [module, setModule] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [report, setReport] = useState([]);
  const [errors, setErrors] = useState("");
  const [userName, setUsername] = useState("");
  const [date, setDate] = useState(null);
  let initialValues = {
    bug_description: "",
    bug_type: "Bug",
    severity: "",
    sprint: localStorage.getItem("currentSprint") ? localStorage.getItem("currentSprint") : 6,
    moduleId: "",
    projectId: "",
    assignedTo: "",
    reportedBy: "",
    createdby: "",
    status: "Opened",
    estimate_date: null,
    customerfound: false,
    bug_id: "",
  };
  const [bugData, setBugData] = useState(initialValues);
  const [idData, setIDData] = useState({ projectId: "" });

  const handleOpenDialog = () => {
    setBugData({
      ...bugData,
      createdby: userName
    });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    resetDate();
    setOpen(false);
  };
  const bugDisplay = async () => {
    const record = await apiService.getProjects();
    setprojectName(record);
    const moduledata = await apiService.getModule();
    setModule(moduledata);
    const getUsers = await apiService.getUsers();
    setAssigned(getUsers);
    setReport(getUsers);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!bugData.projectId) {
      newErrors.projectId = "Project name is required.";
    }
    if (!bugData.bug_description) {
      newErrors.bug_description = "Bug description is required.";
    }

    if (!bugData.bug_type) {
      newErrors.bug_type = "Bug type is required.";
    }
    if (!bugData.moduleId) {
      newErrors.moduleId = "Module Name is required.";
    }
    if (!bugData.assignedTo) {
      newErrors.assignedTo = "Assigned To is required.";
    }
    if (!bugData.reportedBy) {
      newErrors.reportedBy = "Reported by is required.";
    }
    if (!bugData.severity) {
      newErrors.severity = "Severity is required.";
    }
    if (bugData.customerfound === "") {
      newErrors.customerfound = "Customer Found is required.";
    }
    if (!bugData.status) {
      newErrors.status = "Status is required.";
    }
    if (!bugData.sprint) {
      newErrors.sprint = "Sprint is required.";
    }
    if (!date) {
      newErrors.estimate_date = "Estimate Date is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleCreateBug = async () => {
    if (validateForm()) {
      let data = {
        ...bugData,
        estimate_date: date,
      };
      try {
        const result = await apiService.createBugs(data);
        if (result) {
          loadData();
          bugStatus();
          handleReset();
        }
        setOpen(false);
      } catch (error) {
        console.error("Error creating bug:", error);
      }
    }
  };
  const moduleApi = async (data) => {
    let payloadData = {
      projectid: idData.projectId,
      moduleid: data,
      createdby: userName,
    };
    const response = await apiService.generateBug(payloadData);
    if (response) {
      setBugData({ ...bugData, bug_id: response.response, moduleId: data });
    }
  };
  const handleCustomerFoundChange = (event) => {
    setBugData({ ...bugData, customerfound: event.target.value === "true" });
  };

  const handleReset = () => {
    resetDate();
    setBugData(initialValues);
  };
  useEffect(() => {
    bugDisplay();
    setUsername(localStorage.getItem("name"));
  }, []);

  const resetDate = () => {
    setDate(null);
  };
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleOpenDialog}
        style={{
          marginBottom: "20px",
          background: "#398EED",
          color: "#ffffff",
          boxShadow: "1px 1px 8px 1px gray",
        }}
      >
        Create Bug
      </Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle style={{ backgroundColor: "#398EED", color: "white" }}>
          Create Bugs
        </DialogTitle>{" "}
        <DialogContent>
          <Grid container style={{ marginTop: "5px" }} spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="project-name-label">Project name</InputLabel>
                <Select
                  label="Project Name"
                  value={bugData.projectId}
                  onChange={(event) => {
                    setBugData({ ...bugData, projectId: event.target.value });
                    setIDData({ projectId: event.target.value });
                  }}
                >
                  {projectName.map((projectdata) => (
                    <MenuItem key={projectdata._id} value={projectdata._id}>
                      {projectdata.title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.projectId && (
                  <FormHelperText error>{errors.projectId}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <br />
            <br />

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="module-name-label">Module name</InputLabel>
                <Select
                  label="Project Name"
                  value={bugData.moduleId}
                  onChange={(event) => {
                    setBugData({
                      ...bugData,
                      moduleId: event.target.value,
                    });
                    moduleApi(event.target.value);
                  }}
                >
                  {module.map((moduledatas) => (
                    <MenuItem key={moduledatas._id} value={moduledatas._id}>
                      {moduledatas.module_name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{errors.moduleId}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  label="Bug Id"
                  name="bug_id"
                  variant="outlined"
                  value={bugData.bug_id}
                  onChange={(event) =>
                    setBugData({ ...bugData, bug_id: event.target.value })
                  }
                  disabled={true}
                />
              </FormControl>
            </Grid>
            <br />
            <br />

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
                <FormHelperText error>{errors.bug_type}</FormHelperText>
              </FormControl>
            </Grid>
            <br />
            <br />
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
              <FormHelperText error>{errors.bug_description}</FormHelperText>
            </Grid>
            <br />
            <br />
            <br />
            <br />

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
                <FormHelperText error>{errors.assignedTo}</FormHelperText>
              </FormControl>
            </Grid>
            <br />
            <br />
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
                <FormHelperText error>{errors.reportedBy}</FormHelperText>
              </FormControl>
            </Grid>
            <br />
            <br />
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  label="Created By"
                  name="createdby"
                  variant="outlined"
                  value={userName}
                  disabled
                />
              </FormControl>
            </Grid>
            <br />
            <br />
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
                </Select>{" "}
                <FormHelperText error>{errors.severity}</FormHelperText>
              </FormControl>
            </Grid>

            <br />
            <br />
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
                <FormHelperText error>{errors.status}</FormHelperText>
              </FormControl>
            </Grid>
          
            <br />
            <br />
            <Grid item xs={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker 
                      format="DD/MM/YYYY"
                      label="Estimate Date"
                      value={date || dayjs(new Date())} 
                      onChange={(value) => {
                        setDate(value);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </DemoContainer>
                </LocalizationProvider>

                {errors.estimate_date && (
                  <FormHelperText error>{errors.estimate_date}</FormHelperText>
                )}
              </FormControl>
            </Grid>
        
            <br />
            <br />
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="bug-type-label">Sprint</InputLabel>

                <Select
                  label="sprint"
                  value={bugData.sprint}
                  onChange={(event) =>
                    setBugData({ ...bugData, sprint: event.target.value })
                  }
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                </Select>
                <FormHelperText error>{errors.sprint}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl component="fieldset">
        <FormLabel component="legend">Customer Found</FormLabel>              <RadioGroup
                  row
                  name="customerfound"
                  value={bugData.customerfound.toString()} 
                  onChange={handleCustomerFoundChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
                <FormHelperText error>{errors.customerfound}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDialog();
              handleReset();
            }}
            color="primary"
          >
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
