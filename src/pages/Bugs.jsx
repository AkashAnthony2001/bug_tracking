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
import { Link, useNavigate } from "react-router-dom";
export default function Bugs({ handleClick }) {
  const [bugData, setBugdata] = useState([]);
  const [changemsg, setChangemsg] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);
  const [bugResponse, setBugResponse] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [bugStatusData, setBugStatusData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [comment, setComment] = useState("");

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

  const headers = ["Bug_id", "Comments", "Status", "Updated By", "Updated On"];

  const bugStatusApi = async () => {
    const bugStatusResponse = await apiService.bugStatus();
    setBugResponse(bugStatusResponse);
  };

  const bugDisplay = async () => {
    const data = await apiService.getBugs();
    setBugdata(data);
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
    navigate(`/dashboard/details/${databug.bug_id}`, { state: databug });
  };
  return (
    <>
      <BugsDialogue loadData={bugDisplay} bugStatus={bugStatusApi} />
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#EFEFEF", padding: "16px" }}
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
            {bugData.length ? (
              bugData?.map((databug, index) => {
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
                        backgroundColor: isEvenRow ? "#f2f2f2" : "white",
                        border: "1px solid #ccc",
                        padding: "8px",
                      }}
                      onClick={() => {
                        handleClick(databug.id);
                      }}
                      tabIndex={-1}
                    >
                      <TableCell sx={{ textAlign: "center" }}>
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
                        <span>
                          <ArrowOutwardIcon
                            sx={{ color: "#596e79" }}
                            onClick={() => handleIconClick(databug)}
                          />
                        </span>
                      </TableCell>
                      <TableCell style={styles} sx={{ maxWidth: "500px" }}>
                        {databug?.bug_description}
                      </TableCell>
                      <TableCell style={styles}>
                        {databug?.assignedTo?.username}
                      </TableCell>
                      <TableCell style={styles}>{databug?.sprint}</TableCell>
                      <TableCell style={styles}>{formattedDate}</TableCell>
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
