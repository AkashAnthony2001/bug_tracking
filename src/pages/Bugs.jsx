import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import BugsDialogue from "./BugsDialogue";
import CustomizedSnackbars from "../components/CustomizedSnackbars";
import Collapse from "@mui/material/Collapse";
import BugStatusTable from "../components/BugStatusTable";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StatusChangeDialog from "../components/StatusChangeDialog";

export default function Bugs() {
  const [bugData, setBugdata] = useState([]);
  const [changemsg, setChangemsg] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);
  const [bugResponse, setBugResponse] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [bugStatusData, setBugStatusData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedSprint, setSelectedSprint] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredData, setFilteredData] = useState(bugData);
  const [updateSprint, setUpdateSprint] = useState({});

  const handleComment = async () => {
    const obj = {
      ...bugStatusData,
      comment,
    };
    console.log(obj);

    const statusData = await apiService.putStatus(obj);
    if (!statusData.error) {
      handleCloseDialog();
      setChangemsg(statusData);
    }
  };
  const handleChange = async (event, _id) => {
    let obj = {
      data: event.target.value,
      id: _id,
    };
    setUpdateSprint(event.target.value);
    const sprintData = await apiService.editSprint(obj);
    bugDisplay()
  };
  const headers = ["Bug_id", "Comments", "Status", "Updated By", "Updated On"];

  const bugStatusApi = async () => {
    const bugStatusResponse = await apiService.bugStatus();
    setBugResponse(bugStatusResponse);
  };

  const bugDisplay = async () => {
    const data = await apiService.getBugs();
    setBugdata(data);
    const usersData = await apiService.getUsers();
    setUsers(usersData);
  };
  const statusColors = {
    Opened: "	#32cd32",
    Assigned: "blue",
    InProgress: "	#800000	",
    Resolved: "purple",
    Testing: "orange",
    Verified: "	#32cd32",
    Closed: "red",
    Hold: "#708090",
  };
  useEffect(() => {
    bugDisplay();
    bugStatusApi();
  }, [changemsg]);

  useEffect(() => {
    const filteredItems = bugData?.filter(
      (item) =>
        (selectedUser === "" || item.assignedTo.username === selectedUser) &&
        (selectedSprint === "" || item.sprint === selectedSprint) &&
        (selectedStatus === "" || item.status === selectedStatus)
    );
    setFilteredData(filteredItems);
    console.log(filteredData);
  }, [selectedUser, selectedSprint, selectedStatus, bugData]);

  const styles = {
    textAlign: "center",
    padding: "8px",
  };
  const handleStatus = async (event, id) => {
    setIsDialogOpen(true);
    setComment("");

    let obj = {
      status: event.target.value,
      updatedby: localStorage.getItem("name"),
      _id: id,
    };
    setBugStatusData(obj);
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  }
  const collapseRow = (index, bugid) => {
    setExpandedRow(index === expandedRow ? null : index);
    const filteredData = bugResponse.response.filter((data) => {
      return data.bug_id === bugid;
    });
    setFilteredResponse(filteredData);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const sprints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSelectedUsers = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSelectedSprint = (event) => {
    setSelectedSprint(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStatus = (event) => {
    setSelectedStatus(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <BugsDialogue loadData={bugDisplay} bugStatus={bugStatusApi} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ mx: 1, fontWeight: "bold" }}
            variant="text"
            color="initial"
          >
            Filter :{" "}
          </Typography>
          <FormControl sx={{ minWidth: 120, mx: 1 }} size="small">
            <Select
              value={selectedUser}
              onChange={(event) => handleSelectedUsers(event)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Users</em>
              </MenuItem>
              {users &&
                users?.map((data) => (
                  <MenuItem key={data._id} value={data?.username}>
                    {data?.username}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <Select
              value={selectedSprint}
              onChange={(event) => handleSelectedSprint(event)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Sprints</em>
              </MenuItem>
              {sprints.map((data) => (
                <MenuItem key={data} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120, mx: 1 }} size="small">
            <Select
              value={selectedStatus}
              onChange={(event) => handleSelectedStatus(event)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Status</em>
              </MenuItem>
              {Object.entries(statusColors).map(([status, color]) => (
                <MenuItem
                  key={status}
                  value={status}
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <span style={{ color }}>{status}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#EFEFEF", padding: "16px" }}
      >
        {" "}
        <Table
          aria-label="simple table"
          sx={{ border: "1px solid #ccc", width: "100%" }}
        >
          <TableHead>
            <TableRow>
              <TableCell style={styles}>BugId</TableCell>
              <TableCell style={styles}>Bug Description</TableCell>
              <TableCell style={styles}>Bug Type</TableCell>
              <TableCell style={styles}>Project Name</TableCell>
              <TableCell style={styles}>Module Name</TableCell>
              <TableCell style={styles}>Assigned To</TableCell>
              <TableCell style={styles}>Reported By</TableCell>
              <TableCell style={styles}>Serviertiy</TableCell>
              <TableCell style={styles}>Sprint</TableCell>
              <TableCell style={styles}>Customer Found</TableCell>
              <TableCell style={styles}>Estimate_date</TableCell>
              <TableCell style={styles}>CreatedBy</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length ? (
              filteredData?.map((databug, index) => {
                const rowStyles =
                  index % 2 === 0
                    ? { backgroundColor: "#FFFFFF" }
                    : { backgroundColor: "#F0F0F0" };
                const originalDateString = databug.estimate_date;
                const formattedDate = formatDate(originalDateString);
                const isRowExpanded = index === expandedRow;
                return (
                  <>
                    <TableRow
                      key={databug.bug_id}
                      sx={{
                        "& > *": { borderBottom: "unset" },
                        ...rowStyles,
                        border: "1px solid #ccc",
                        padding: "8px",
                      }}
                    >
                      <TableCell>
                        <Button
                          variant="text"
                          onClick={() => collapseRow(index, databug?.bug_id)}
                          style={{
                            backgroundColor: "#596e79",
                            color: "white",
                            padding: "4px 8px",
                          }}
                        >
                          {databug?.bug_id}
                        </Button>
                      </TableCell>
                      <TableCell style={styles}>
                        {databug?.bug_description}
                      </TableCell>
                      <TableCell style={styles}>{databug?.bug_type}</TableCell>
                      <TableCell style={styles}>
                        {databug?.projectId?.title}
                      </TableCell>
                      <TableCell style={styles}>
                        {databug?.moduleId?.module_name}
                      </TableCell>
                      <TableCell style={styles}>
                        {databug?.assignedTo?.username}
                      </TableCell>
                      <TableCell style={styles}>
                        {databug?.reportedBy?.username}
                      </TableCell>
                      <TableCell style={styles}>{databug?.severity}</TableCell>
                      <TableCell style={styles}>
                        <FormControl sx={{ m: 2 }} size="small">
                          <InputLabel></InputLabel>
                          <Select
                            value={databug?.sprint}
                            onChange={(e) => {
                              handleChange(e, databug?._id);
                            }}
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
                      </TableCell>{" "}
                      <TableCell style={styles}>
                        {databug?.customerfound ? "Yes" : "No"}
                      </TableCell>
                      <TableCell
                        style={{
                          ...styles,
                          color:
                            formattedDate <= formatDate(new Date())
                              ? "red"
                              : "black",
                        }}
                      >
                        {formattedDate}
                      </TableCell>
                      <TableCell style={styles}>{databug?.createdby}</TableCell>
                      <FormControl sx={{ m: 2 }} size="small">
                        <InputLabel></InputLabel>
                        <Select
                          defaultValue={databug?.status}
                          onChange={(e) => {
                            handleStatus(e, databug?._id);
                            setExpandedRow(null);
                          }}
                        >
                          {Object.entries(statusColors).map(
                            ([status, color]) => (
                              <MenuItem
                                key={status}
                                value={status}
                                style={{
                                  width: "100%",
                                  marginTop: "5px",
                                  marginBottom: "5px",
                                }}
                              >
                                <span style={{ color }}>{status}</span>
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={13}
                      >
                        <Collapse
                          in={isRowExpanded}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Typography variant="h6" color="initial">
                            Status History
                          </Typography>
                          <BugStatusTable
                            bugStatusData={filteredResponse}
                            headers={headers}
                            load={bugStatusApi}
                            setExpandedRow={setExpandedRow}
                          />
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={13}>
                  <Typography variant="h6" color="initial">
                    No Records Found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <StatusChangeDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        bugData={bugStatusData}
        setComment={setComment}
        comment={comment}
        handleComment={handleComment}
      />
      <CustomizedSnackbars
        error={changemsg.error}
        message={changemsg.message}
        setChangemsg={setChangemsg}
      />
    </>
  );
}
