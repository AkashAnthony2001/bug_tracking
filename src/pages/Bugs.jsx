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



  const handleComment = async() => {
      const obj = {
          ...bugStatusData,
          comment
      }
      console.log(obj)
      
      const statusData = await apiService.putStatus(obj);
      if(!statusData.error){
        handleCloseDialog();
        setChangemsg(statusData)
      }
  }

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
    Hold: "#708090"
  };
  useEffect(() => {
    bugDisplay();
    bugStatusApi();
  }, [changemsg]);

  const styles = {
    textAlign: "center",
    padding: "8px"
  };
  const handleStatus = async (event, id) => {
    setIsDialogOpen(true);

    let obj = {
      status: event.target.value,
      updatedby: localStorage.getItem("name"),
      _id: id,
    };
    setBugStatusData(obj)
    
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
            {bugData.length ? (
              bugData?.map((databug, index) => {
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
                      <TableCell style={styles}>{databug?.sprint}</TableCell>
                      <TableCell style={styles}>
                        {databug?.customerfound ? "Yes" : "No"}
                      </TableCell>
                      <TableCell style={styles}>{formattedDate}</TableCell>
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
      <StatusChangeDialog isOpen={isDialogOpen} onClose={handleCloseDialog} bugData={bugStatusData} setComment={setComment} comment={comment} handleComment={handleComment}/>
      <CustomizedSnackbars
        error={changemsg.error}
        message={changemsg.message}
        setChangemsg={setChangemsg}
      />
    </>
  );
}
