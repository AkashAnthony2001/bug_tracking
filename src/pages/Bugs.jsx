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

export default function Bugs() {
  const [bugData, setBugdata] = useState([]);
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [changemsg, setChangemsg] = useState({});

  const bugDisplay = async () => {
    const data = await apiService.getBugs();
    setBugdata(data);
    // console.log(data, "res");
  };

  useEffect(() => {
    bugDisplay();
  }, []);

  const handleStatus = async (event, id) => {
    let obj = {
      status: event.target.value,
      _id: id,
    };
    setSelectedStatus(event.target.value);
    const statusData = await apiService.putStatus(obj);
    console.log(statusData,"nr")
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
  return (
    <>
      <BugsDialogue />
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
            {bugData?.map((databug) => {
              const originalDateString = databug.estimate_date;
              const formattedDate = formatDate(originalDateString);
              return (
              <TableRow>
                <TableCell>{databug?.bug_id}</TableCell>
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
                <TableCell>{databug?.createdby.username}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={databug?.status}
                    onChange={(e) => {
                      handleStatus(e, databug._id);
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
            )})}
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
