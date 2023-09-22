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
  Button,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import BugsDialogue from "./BugsDialogue";
import CustomizedSnackbars from "../components/CustomizedSnackbars";
import Collapse from "@mui/material/Collapse";
import BugStatusTable from "../components/BugStatusTable";
import Typography from "@mui/material/Typography";
import StatusChangeDialog from "../components/StatusChangeDialog";
import CustomizedMenus from "../components/CustomizedMenus";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
export default function Bugs({ handleClick }) {
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
  const [copiedStates, setCopiedStates] = useState(
    Array(filteredData.length).fill(false)
  );

  const handleComment = async () => {
    const obj = {
      ...bugStatusData,
      comment,
    };

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
    await apiService.editSprint(obj);
    bugDisplay();
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

  const header = [
    "BugId",
    "BugDescription",
    "AssignedTo",
    "Sprint",
    "EstimateDate",
    "Status",
    "MoreInfo",
  ];
  const navigate = useNavigate();
  const handleIconClick = (databug) => {
    navigate(`/dashboard/details/${databug.bug_id}/#bugs`, { state: databug });
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
  };

  const handleSelectedStatus = (event) => {
    setSelectedStatus(event.target.value);
  };
  const copyToClipboard = (text, index) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const updatedCopiedStates = [...copiedStates];
        updatedCopiedStates[index] = true;
        setCopiedStates(updatedCopiedStates);
        setTimeout(() => {
          const resetCopiedStates = [...updatedCopiedStates];
          resetCopiedStates[index] = false;
          setCopiedStates(resetCopiedStates);
        }, 1000);
      })
      .catch((error) => {
        console.error("Copy failed: ", error);
      });
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
        sx={{ backgroundColor: "#FFFFFF", padding: "13px" }}
      >
        {" "}
        <Table
          aria-label="simple table"
          stickyHeader
          sx={{ border: "1px solid #ccc", width: "100%" }}
        >
          <TableHead>
            <TableRow>
              {header &&
                header.map((val) => (
                  <TableCell sx={{ textAlign: "center" }} key={val}>
                    {val}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.length ? (
              filteredData?.map((databug, index) => {
                const originalDateString = databug.estimate_date;
                const formattedDate = formatDate(originalDateString);
                const isRowExpanded = index === expandedRow;
                const isEvenRow = index % 2 === 0;

                return (
                  <>
                    <TableRow
                      key={databug.bug_id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                        backgroundColor: isEvenRow ? "#F1F6F9" : "white",
                        border: "1px solid #ccc",
                        padding: "8px",
                      }}
                      onClick={() => {
                        handleClick(databug.id);
                      }}
                      tabIndex={-1}
                    >
                      <TableCell
                        sx={{ textAlign: "center", alignItems: "center", maxWidth:"252px" }}
                      >
                        <div style={{display:"flex", flexDirection:"row"}}>
                        <Button
                          variant="text"
                          onClick={() => collapseRow(index, databug?.bug_id)}
                          style={{
                            backgroundColor: "#398EED",
                            color: "white",
                            padding: "4px 8px",
                            textTransform: "lowercase",
                          }}
                        >
                          {databug?.bug_id}
                        </Button>
                        <span style={{display:"flex", flexDirection:"column"}}>
                          <ArrowOutwardIcon
                            sx={{ color: "#398EED" }}
                            onClick={() => handleIconClick(databug)}
                          />
                          <ContentCopyRoundedIcon
                            sx={{ color: "#398EED", fontSize:"large",  }}
                            onClick={() =>
                              copyToClipboard(databug?.bug_id, index)
                            }
                          />
                        </span>
                        {copiedStates[index] && (
                            <span style={{ marginLeft: "4px", color: "green" }}>
                              ID Copied!
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell style={styles} sx={{ maxWidth: "400px" }}>
                        {databug?.bug_description}
                      </TableCell>
                      <TableCell style={styles}>
                        {databug?.assignedTo?.username}
                      </TableCell>
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
                      </TableCell>
                      <TableCell
                        style={{
                          ...styles,
                          color:
                            new Date(databug?.estimate_date) <= new Date()
                              ? "red"
                              : "black",
                        }}
                      >
                        {formattedDate}
                      </TableCell>
                      <FormControl sx={{ m: 2 }} size="small">
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
                      <TableCell style={styles}>
                        <CustomizedMenus data={databug} />
                      </TableCell>
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
