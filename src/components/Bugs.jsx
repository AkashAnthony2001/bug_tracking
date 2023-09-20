import {
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
import Collapse from '@mui/material/Collapse';
import BugStatusTable from '../components/BugStatusTable';
import Typography from '@mui/material/Typography'
import Button from "@mui/material/Button";



export default function Bugs() {
  const [bugData, setBugdata] = useState([]);
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [changemsg, setChangemsg] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);
  const [bugResponse, setBugResponse] = useState([]);
  const [filteredResponse , setFilteredResponse] = useState([])

  const headers = ['Bug_id','Status','CreatedBy','CreatedOn']

  const bugStatusApi = async() => {
      const bugStatusResponse = await apiService.bugStatus()
      setBugResponse(bugStatusResponse)
  }

  const bugDisplay = async () => {
    const data = await apiService.getBugs();
    setBugdata(data);
    // console.log(data, "res");
  };

  useEffect(() => {
    bugDisplay();
    bugStatusApi();
  }, [changemsg]);

  const handleStatus = async (event, id) => {
    let obj = {
      status: event.target.value,
      _id: id,
    };
    setSelectedStatus(event.target.value);
    const statusData = await apiService.putStatus(obj);
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

  const collapseRow = (index,bugid) => {
    setExpandedRow(index === expandedRow ? null : index)
    const filteredData = bugResponse.response.filter((data)=> {
      return data.bug_id === bugid
    })
    setFilteredResponse(filteredData)
  }

   return (
    <>
      <BugsDialogue loadData={bugDisplay}/>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>BugId</TableCell>
              <TableCell>Bug Description</TableCell>
              <TableCell>Bug Type</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Module Name</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Reported By</TableCell>
              <TableCell>Serviertiy</TableCell>
              <TableCell>Sprint</TableCell>
              <TableCell>Customer Found</TableCell>
              <TableCell>Estimate_date</TableCell>
              <TableCell>CreatedBy</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bugData?.map((databug,index) => {
              const originalDateString = databug.estimate_date;
              const formattedDate = formatDate(originalDateString);
              const isRowExpanded = index === expandedRow;
              return (
                <>
                  <TableRow key={databug.bug_id} sx={{ '& > *': { borderBottom: 'unset' } }} >
                    <TableCell><Button variant="text" onClick={() => collapseRow(index,databug?.bug_id)}>{databug?.bug_id}</Button></TableCell>
                    <TableCell>{databug?.bug_description}</TableCell>
                    <TableCell>{databug?.bug_type}</TableCell>
                    <TableCell>{databug?.projectId?.title}</TableCell>
                    <TableCell>{databug?.moduleId?.module_name}</TableCell>
                    <TableCell>{databug?.assignedTo?.username}</TableCell>
                    <TableCell>{databug?.reportedBy?.username}</TableCell>
                    <TableCell>{databug?.severity}</TableCell>
                    <TableCell>{databug?.sprint}</TableCell>
                    <TableCell>{databug?.customerfound ? "Yes" : "No"}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{databug?.createdby?.username}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={databug?.status}
                        onChange={(e) => {
                          handleStatus(e, databug?._id);
                        }}
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
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
                      <Collapse  in={isRowExpanded} timeout="auto" unmountOnExit>
                      <Typography variant="h6" color="initial">Status History</Typography>
                      <BugStatusTable bugStatusData={filteredResponse}  headers={headers}/>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              )
            })}
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
