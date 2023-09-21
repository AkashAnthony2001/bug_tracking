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
} from "@mui/material";
import "./styles.css";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import apiService from "../services/apiService";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function BugsDialogue({ loadData }) {
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
  };
  const [bugData, setBugData] = useState(initialValues);
  const [idData, setIDData] = useState({ projectId: "" });

  const handleOpenDialog = () => {
    // setBugData((
    //     ...prevData,
    //     createdby: userName,
    // );
    setBugData({
      ...bugData,
      createdby: userName,
    });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const bugDisplay = async () => {
    const data = await apiService.getBugs();
    const record = await apiService.getProjects();
    setprojectName(record);
    const moduledata = await apiService.getModule();
    setModule(moduledata);
    const assignedData = await apiService.getUsers();
    setAssigned(assignedData);
    const reportdata = await apiService.getUsers();
    setReport(reportdata);
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
          setOpen(false);
        }
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

  const handleReset = () => {
    setBugData(initialValues);
  };
  useEffect(() => {
    bugDisplay();
    setUsername(localStorage.getItem("name"));
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpenDialog}
        style={{
          marginBottom: "10px",
          borderRadius: "10px",
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        Create Bug
      </Button>
      <Dialog open={open}  onClose={handleCloseDialog} PaperProps={{sx:{borderRadius: "15px"}}}>
        <DialogTitle
          style={{
            background: "#2196F3",
            color: "#fff",
            fontSize: "24px",
            padding: "16px",
          }}
        >
          Create Bugs
        </DialogTitle>
        <DialogContent>
          <Grid container style={{ marginTop: "5px" }} spacing={2}>
            {/* project name dialogbox */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel
                  id="project-name-label"
                  style={{ fontSize: "16px" }}
                >
                  Project name
                </InputLabel>{" "}
                <Select
                  label="Project Name"
                  value={bugData.projectId}
                  style={{ fontSize: "14px" }}
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

            {/* module name dialog box */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="module-name-label">Module name</InputLabel>
                <Select
                  label="Project Name"
                  value={bugData.moduleId}
                  style={{ fontSize: "14px" }}
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
            {/* bug id dialogue */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  label="Bug Id"
                  name="bug_id"
                  variant="outlined"
                  style={{ fontSize: "14px" }}
                  value={bugData.bug_id}
                  onChange={(event) =>
                    setBugData({ ...bugData, bug_id: event.target.value })
                  }
                  disabled={true}
                  // style={{ width: "100%", marginBottom: "16px" }}
                />
              </FormControl>
            </Grid>

            {/* Bug Type dialogbox */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="bug-type-label">Bug Type</InputLabel>
                <Select
                  label="Bug Type"
                  style={{ fontSize: "14px" }}
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

            {/* bug_description dialogbox */}
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Bug Description"
                multiline
                fullWidth
                style={{ fontSize: "14px" }}
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
            {/* assigned name dialog box */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="assigned-to-label">Assigned To</InputLabel>
                <Select
                  label="Assigned To"
                  value={bugData.assignedTo}
                  style={{ fontSize: "14px" }}
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

            {/* Reported by dialogbox */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="reported-by-label">Reported By</InputLabel>
                <Select
                  label="Reported By"
                  value={bugData.reportedBy}
                  style={{ fontSize: "14px" }}
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

            {/* created by dialogbox */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  label="Created By"
                  style={{ fontSize: "14px" }}
                  name="createdby"
                  variant="outlined"
                  value={userName}
                  disabled
                />
              </FormControl>
            </Grid>

            {/* Serviertiy dialog box */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="bug-type-label">Serviertiy</InputLabel>
                <Select
                  label="Status"
                  value={bugData.severity}
                  style={{ fontSize: "14px" }}
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

            {/* customer found dialog box */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="bug-type-label">Customer Found</InputLabel>
                <Select
                  label="Customer Found"
                  value={bugData.customerfound}
                  style={{ fontSize: "14px" }}
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
                <FormHelperText error>{errors.customerfound}</FormHelperText>
              </FormControl>
            </Grid>

            {/* estimate date dailog */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Estimate Date"
                      value={date || null}
                      style={{ fontSize: "14px" }}
                      onChange={(value) => {
          
                        setDate( value?.$d?.toLocaleDateString("en-CA"));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {errors.estimate_date && (
                  <FormHelperText error>{errors.estimate_date}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* status dialogbox */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="bug-type-label">Status</InputLabel>
                <Select
                  label="Status"
                  value={bugData.status}
                  style={{ fontSize: "14px" }}
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

            {/* Sprint dialog box */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="bug-type-label">Sprint</InputLabel>

                <Select
                  label="sprint"
                  style={{ fontSize: "14px" }}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDialog();
              handleReset();
            }}
            color="primary"
            style={{
              marginRight: "8px",
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateBug} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
