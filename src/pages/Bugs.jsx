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

export default function Bugs() {
  const [bugData, setBugdata] = useState([]);
  const [changemsg, setChangemsg] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);
  const [bugResponse, setBugResponse] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);

  const headers = ["Bug_id", "Status", "Updated By", "Updated On"];

  const bugStatusApi = async () => {
    const bugStatusResponse = await apiService.bugStatus();
    setBugResponse(bugStatusResponse);
  };

  const bugDisplay = async () => {
    const data = await apiService.getBugs();
    setBugdata(data);
    // console.log(data, "res");
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

  const handleStatus = async (event, id) => {
    let obj = {
      status: event.target.value,
      updatedby: localStorage.getItem("name"),
      _id: id,
    };
    const statusData = await apiService.putStatus(obj);
    console.log(statusData, "nr");
    setChangemsg(statusData);
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
    console.log(expandedRow);
  };

  return (
    <>
      <BugsDialogue loadData={bugDisplay} bugStatus={bugStatusApi} />
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#EFEFEF", padding: "16px" }}
      >
        {" "}
        <Table aria-label="simple table" sx={{ border: '1px solid #ccc', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                BugId
              </TableCell>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                Bug Description
              </TableCell>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                Bug Type
              </TableCell>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                Project Name
              </TableCell>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                Module Name
              </TableCell>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                Assigned To
              </TableCell>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                Reported By
              </TableCell>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                Serviertiy
              </TableCell>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                Sprint
              </TableCell>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                Customer Found
              </TableCell>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                Estimate_date
              </TableCell>
              <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                CreatedBy
              </TableCell>
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
                console.log(bugData);
                return (
                  <>
                    <TableRow
                      key={databug.bug_id}
                      sx={{ "& > *": { borderBottom: "unset" }, ...rowStyles, border: '1px solid #ccc',
                      padding: '8px', }}
                    >
                      <TableCell>
                        <Button
                          variant="text"
                          onClick={() => collapseRow(index, databug?.bug_id)}
                          style={{ backgroundColor: "#596e79", color: "white" , padding: '4px 8px'}}
                        >
                          {databug?.bug_id}
                        </Button>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                        {databug?.bug_description}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                        {databug?.bug_type}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                        {databug?.projectId?.title}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                        {databug?.moduleId?.module_name}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                        {databug?.assignedTo?.username}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                        {databug?.reportedBy?.username}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                        {databug?.severity}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                        {databug?.sprint}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                        {databug?.customerfound ? "Yes" : "No"}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                        {formattedDate}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                        {databug?.createdby}
                      </TableCell>
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
                          <Typography
                            variant="h6"
                            color="initial"
                          >
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
      <CustomizedSnackbars
        error={changemsg.error}
        message={changemsg.message}
        setChangemsg={setChangemsg}
      />
    </>
  );
}
