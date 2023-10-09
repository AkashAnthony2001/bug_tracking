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
  Checkbox,
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
import TablePagination from "@mui/material/TablePagination";
import CopyComponent from "../components/CopyComponent";
import { store, getStoreValue, constants, removeStoreValue } from "../utils";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


export default function Bugs() {
  const [currentSprint, setCurrentSprint] = useState("4");
  const [sprintData, setSprintData] = useState([]);
  const [bugData, setBugdata] = useState([]);
  const [changemsg, setChangemsg] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);
  const [bugResponse, setBugResponse] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [bugStatusData, setBugStatusData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [expanded, setExpanded] = React.useState('');
  const [selectedUser, setSelectedUser] = useState(
    getStoreValue(constants.USERS)
  );
  const [selectedType, setSelectedType] = useState(
    getStoreValue(constants.TYPES)
  );
  const [selectedSprint, setSelectedSprint] = useState(
    getStoreValue(constants.SPRINT)
  );
  const [selectedStatus, setSelectedStatus] = useState(
    getStoreValue(constants.STATUS) ? getStoreValue(constants.STATUS) : ['Opened', 'InProgress', 'Assigned']
  );
  const [selectedProject, setSelectedProject] = useState(
    getStoreValue(constants.PROJECTS)
  );
  const [filteredData, setFilteredData] = useState(bugData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    const obj = {
      data: event.target.value,
      id: _id,
    };
    const sprintData = await apiService.editSprint(obj);
    if (!sprintData.error) {
      const message = `Sprint updated to ${event.target.value}.`;
      setChangemsg({
        ...sprintData,
        message,
      });
      bugDisplay();
    }
  };
  const handleAssiUserChange = async (event, _id) => {
    const selectedUserId = event.target.value;
    const selectedUser = users.find((user) => user._id === selectedUserId);
    const obj = {
      data: event.target.value,
      id: _id,
    };
    const assiUserData = await apiService.updateAssiUser(obj);
    if (!assiUserData.error) {
      const message = `Assigned user updated to ${selectedUser?.username}.`;
      setChangemsg({
        ...assiUserData,
        message,
      });
      bugDisplay();
    }
  };
  const headers = ["Bug_id", "Comments", "Status", "Updated By", "Updated On"];

  const bugStatusApi = async () => {
    const bugStatusResponse = await apiService.bugStatus();
    setBugResponse(bugStatusResponse);
  };
  const groupByKey = (array, key) => {
    return array
      .reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
      }, {})
  }
  const bugDisplay = async () => {
    let data = await apiService.getBugs();
    data.forEach((_b) => {
      _b.username = _b.assignedTo.username
    })
    data = data.filter((_f)=>_f.sprint == currentSprint)
    setBugdata(data);
    const usersData = await apiService.getUsers();
    setUsers(usersData);
    const projectsData = await apiService.getProjects();
    setProjects(projectsData);
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
    if (filteredData && filteredData.length) {
      setSprintData(groupByKey(filteredData, 'username'))
    }
  }, [filteredData]);

  useEffect(() => {
    const filteredItems = bugData?.filter(
      (item) =>
        (selectedUser === "" ||
          selectedUser.join("") === "" ||
          selectedUser.join("").includes(item.assignedTo.username)) &&
        (selectedSprint === "" || 
        (selectedSprint && selectedSprint.toString().includes(item.sprint))) &&
        (selectedStatus === "" ||
          selectedStatus.join("") === "" ||
          selectedStatus.join("").includes(item.status)) &&
        (selectedType === "" ||
          selectedType.join("") === "" ||
          selectedType.join("").includes(item.bug_type)) &&
        (selectedProject === "" || item.projectId.title === selectedProject)
    );
    setFilteredData(filteredItems);
  }, [
    selectedUser,
    selectedProject,
    selectedSprint,
    selectedStatus,
    bugData,
    selectedType,
  ]);

  const styles = {
    textAlign: "center",
    padding: "0px",
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    "Track Id",
    "Bug Description",
    "Assigned",
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
    const {
      target: { value },
    } = event;
    store(constants.USERS, value === "string" ? value.split(",") : value);
    setSelectedUser(typeof value === "string" ? value.split(",") : value);
    setPage(0);
  };

  const handleSelectedType = (event) => {
    const {
      target: { value },
    } = event;
    store(constants.TYPES, value === "string" ? value.split(",") : value);
    setSelectedType(typeof value === "string" ? value.split(",") : value);
  };

  const handleSelectedProject = (event) => {
    store(constants.PROJECTS, event.target.value);
    setSelectedProject(event.target.value);
  };

  const handleSelectedSprint = (event) => {
    const {
      target: { value },
    } = event;
    store(constants.SPRINT,value);
    setSelectedSprint(value);
  };

  const handleSelectedStatus = (event) => {
    const {
      target: { value },
    } = event;
    store(constants.STATUS, value === "string" ? value.split(",") : value);
    setSelectedStatus(typeof value === "string" ? value.split(",") : value);
  };

  const isDeveloper =
    localStorage.getItem("role") === "developer" ? true : false;

  const handleClear = () => {
    setFilteredData(bugData)
    setSelectedUser('')
    setSelectedProject('')
    setSelectedType('')
    setSelectedSprint('')
    setSelectedStatus('')
    removeStoreValue()
  }

  const handleAccordingExpand = (value) => {
    setExpanded(value)
  }
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
              value={selectedProject}
              onChange={(event) => handleSelectedProject(event)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>All Projects</em>
              </MenuItem>
              {projects &&
                projects?.map((data) => (
                  <MenuItem key={data._id} value={data?.title}>
                    {data?.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120, mx: 1 }} size="small">
            <Select
              value={
                typeof selectedUser === "string"
                  ? selectedUser.split(",")
                  : selectedUser
              }
              onChange={(event) => handleSelectedUsers(event)}
              multiple
              inputProps={{ "aria-label": "Without label" }}
              renderValue={(selected) => {
                return selected && selected.join("")
                  ? selected.join(",")
                  : "All Users";
              }}
            >
              <MenuItem value="">
                <em>All Users</em>
              </MenuItem>
              {users &&
                users?.map((data) => (
                  <MenuItem key={data._id} value={data?.username}>
                    <Checkbox checked={selectedUser.includes(data?.username)} />
                    <span>{data?.username}</span>
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
              renderValue={(selected) => {
                return selected
                  ? selected
                  : "All Sprints";
              }}
            >
              <MenuItem value="">
                <em>All Sprints</em>
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
              value={
                typeof selectedStatus === "string"
                  ? selectedStatus.split(",")
                  : selectedStatus
              }
              onChange={(event) => handleSelectedStatus(event)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              multiple
              renderValue={(selected) => {
                return selected && selected.join(",")
                  ? selected.join(",").replace(",", "")
                  : "All Status";
              }}
            >
              <MenuItem value="">
                <em>All Status</em>
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
                  <Checkbox checked={selectedStatus.indexOf(status) > -1} />
                  <span style={{ color }}>{status}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120, mx: 1 }} size="small">
            <Select
              value={
                typeof selectedType === "string"
                  ? selectedType.split(",")
                  : selectedType
              }
              onChange={(event) => handleSelectedType(event)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              multiple
              renderValue={(selected) => {
                return selected && selected.join(",")
                  ? selected.join(",").replace(",", "")
                  : "All Type";
              }}
            >
              <MenuItem value="">
                <em>All Type</em>
              </MenuItem>
              {["Bug", "CR"].map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Checkbox checked={selectedType.indexOf(type) > -1} />
                  <span>{type}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" sx={{
            backgroundColor: "#398EED", boxShadow: "1px 1px 8px 1px gray"
          }} size="small" onClick={handleClear}>
            Clear All
          </Button>
          <Typography
            sx={{ mx: 1, fontWeight: "bold" }}
            variant="text"
            color="initial"
          >
            Total :{filteredData.length}
          </Typography>
        </div>
      </Box>

      {sprints.filter(_s => _s == currentSprint).map((sprint) => (
        <>
          <Accordion expanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Sprint {sprint}</Typography>
            </AccordionSummary>
            {
              Object.keys(sprintData).sort().map((_b, index) => {
                return <>
                  <Accordion sx={{ pl: 6, backgroundColor: index % 2 === 0 ? "#F8F9FA" : "white" }} onChange={() => {
                    handleAccordingExpand(_b)
                  }} expanded={expanded === _b}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography>{_b}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                      {sprintData[_b].map(_v => (

                        <>
                          <TableRow
                            key={_v.bug_id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              cursor: "pointer",
                              border: "1px solid #ccc",
                              fontSize: "12px",
                            }}
                            tabIndex={-1}
                          >
                            <TableCell
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                maxWidth: "252px",
                                padding: 0
                              }}
                            >
                              <div
                                style={{ display: "flex", flexDirection: "row" }}
                              >
                                <Tooltip
                                  title={_v.bug_type === "CR" ? "CR" : "Bug"}
                                  arrow
                                  color="success"
                                  placement="left"
                                >
                                  <Button
                                    variant="text"
                                    onClick={() =>
                                      collapseRow(index, _v?.bug_id)
                                    }
                                    style={{
                                      color:
                                        _v.bug_type === "CR"
                                          ? "#398EED"
                                          : "red",
                                      textTransform: "lowercase",
                                      fontSize: '12px'
                                    }}
                                  >
                                    {_v?.bug_id}
                                  </Button>
                                </Tooltip>

                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Tooltip
                                    title="Bug Details"
                                    arrow
                                    color="success"
                                    placement="top"
                                  >
                                    <ArrowOutwardIcon
                                      sx={{ color: "#398EED" }}
                                      onClick={() => handleIconClick(_v)}
                                    />
                                  </Tooltip>

                                  <CopyComponent id={_v?.bug_id} />
                                </span>
                              </div>
                            </TableCell>
                            <TableCell style={styles} sx={{ maxWidth: "400px",minWidth: "400px" }}>
                              {_v?.bug_description}
                            </TableCell>
                            <TableCell style={styles}>
                              <FormControl
                                sx={{ minWidth: 120, mx: 1 }}
                                size="small"
                              >
                                <Select
                                  value={_v?.assignedTo?._id || ""}
                                  onChange={(e) => {
                                    handleAssiUserChange(e, _v?._id);
                                  }}
                                  disabled={isDeveloper}
                                >
                                  {users?.map((assignedvalues) => (
                                    <MenuItem
                                      key={assignedvalues._id}
                                      value={assignedvalues._id}
                                    >
                                      {assignedvalues.username}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell style={styles}>
                              <FormControl sx={{ m: 2 }} size="small">
                                <InputLabel></InputLabel>
                                <Select
                                  value={_v?.sprint}
                                  onChange={(e) => {
                                    handleChange(e, _v?._id);
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
                                  new Date(_v?.estimate_date) <= new Date() && (_v.status === 'Assigned' || _v.status === 'Opened' || _v.status === 'InProgress')
                                    ? "red"
                                    : "black",
                              }}
                            >
                              {formatDate(_v.estimate_date)}
                            </TableCell>
                            <FormControl sx={{ m: 2 }} size="small">
                              <Select
                                defaultValue={_v?.status}
                                onChange={(e) => {
                                  handleStatus(e, _v?._id);
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
                              <CustomizedMenus data={_v} />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ paddingBottom: 0, paddingTop: 0 }}
                              colSpan={13}
                            >
                              <Collapse
                                in={index === expandedRow}
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
                      ))}

                    </AccordionDetails>
                  </Accordion>

                </>
              })
            }

          </Accordion>
        </>
      ))}

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
