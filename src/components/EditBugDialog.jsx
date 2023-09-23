import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  InputLabel,
  FormControl,
  Grid,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  TextField,
  Select,
} from "@mui/material";

import apiService from "../services/apiService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const EditBugDialog = ({ open, handleDialogClose, data }) => {
  const [users, setUsers] = useState([]);
  const [editData, setEditData] = useState(data); 

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const getDetails = async () => {
    const usersDetails = await apiService.getUsers();
    setUsers(usersDetails);
  };

  const handleAssignedToChange = (event) => {
    const selectedUserId = event.target.value;
    const selectedUser = users.find((user) => user._id === selectedUserId);
    setEditData({ ...editData, assignedTo: selectedUser });
  };

  const handleReportedByChange = (event) => {
    const selectedUserId = event.target.value;
    const selectedUser = users.find((user) => user._id === selectedUserId);
    setEditData({ ...editData, reportedBy: selectedUser });
  };

  useEffect(() => {
    getDetails();
  }, []);


  const handleSubmit = async() => {
    const editBugResponse = await apiService.updateAllBug(editData,editData._id)
    console.log(editBugResponse?.response);
  } 

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle>Edit Bugs</DialogTitle>
      <DialogContent>
        <Grid container style={{ marginTop: "5px" }} spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                name="projectId"
                label="Project Name"
                value={editData?.projectId?.title || ""}
                disabled
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                name="moduleId"
                label="Module Name"
                value={editData?.moduleId?.module_name || ""}
                disabled
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                type="text"
                label="Bug Id"
                name="bug_id"
                variant="outlined"
                value={editData?.bug_id || ""}
                disabled
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="bug-type-label">Bug Type</InputLabel>
              <Select
                name="bug_type"
                label="Bug Type"
                value={editData?.bug_type || ""}
                onChange={(e) => setEditData({ ...editData, bug_type: e.target.value })}
              >
                <MenuItem value="Bug">Bug</MenuItem>
                <MenuItem value="CR">CR</MenuItem>
              </Select>
            </FormControl>
          </Grid>

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
              name="bug_description"
              variant="outlined"
              value={editData?.bug_description || ""}
              onChange={(e) => setEditData({ ...editData, bug_description: e.target.value })}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="assigned-to-label">Assigned To</InputLabel>
              <Select
                name="assignedTo"
                label="Assigned To"
                value={editData?.assignedTo?._id || ""}
                onChange={handleAssignedToChange}
              >
                {users?.map((assignedvalues) => (
                  <MenuItem key={assignedvalues._id} value={assignedvalues._id}>
                    {assignedvalues.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="reported-by-label">Reported By</InputLabel>
              <Select
                name="reportedBy"
                label="Reported By"
                value={editData?.reportedBy?._id || ""}
                onChange={handleReportedByChange}
              >
                {users?.map((reportby) => (
                  <MenuItem key={reportby._id} value={reportby._id}>
                    {reportby.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                type="text"
                label="Created By"
                name="createdby"
                variant="outlined"
                value={editData?.createdby || ""}
                disabled
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="severity-label">Severity</InputLabel>
              <Select
                name="severity"
                label="Severity"
                value={editData?.severity || ""}
                onChange={(e) => setEditData({ ...editData, severity: e.target.value })}
              >
                <MenuItem value="Minor">Minor</MenuItem>
                <MenuItem value="Major">Major</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Blocker">Blocker</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                name="status"
                label="Status"
                value={editData?.status || ""}
                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
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

          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="estimate_date"
                  label="Estimate Date"
                  value={formatDate(editData?.estimate_date) || ""}
                  onChange={(newValue) => setEditData({ ...editData, estimate_date: new Date(newValue.$d).toISOString() })}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="sprint-label">Sprint</InputLabel>
              <Select
                name="sprint"
                label="Sprint"
                value={editData?.sprint || ""}
                onChange={(e) => setEditData({ ...editData, sprint: e.target.value })}
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
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Customer Found</FormLabel>
              <RadioGroup
                row
                name="customerfound"
                value={editData?.customerfound || ""}
                onChange={(e) => setEditData({ ...editData, customerfound: e.target.value })}
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
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleSubmit()
            handleDialogClose();
          }}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBugDialog;
