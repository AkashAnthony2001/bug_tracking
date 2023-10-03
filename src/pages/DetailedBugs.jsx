import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Button,
  TableHead,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import EditBugDialog from "../components/EditBugDialog";
import DeleteBug from "../components/DeleteBug";
import apiService from "../services/apiService";

const DetailedBugs = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [bugStatusData, setBugStatusData] = useState([]);
  const data = location.state;
  const hash = location.hash;

  const bugid = data.bug_id;
  const bugStatusApi = async () => {
    const bugStatusResponse = await apiService.bugStatus();
    const filteredData = bugStatusResponse.response.filter((data) => {
      return data.bug_id === bugid;
    });
    setBugStatusData(filteredData);
  };
  useEffect(() => {
    bugStatusApi();
  }, []);
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}-${formattedMonth}-${year}`;
  }
  const handleDialogClose = () => {
    setOpen(false);
  };

  const originalDateString = data.estimate_date;
  const formattedDate = formatDate(originalDateString);
  const isoDateString = data.createdAt;
  const isoformattedDate = formatDate(isoDateString);
  const updatedDtate = data.updatedAt;
  const isUpdatated = formatDate(updatedDtate);

  const details = [
    { label: "Bug Id  :", value: data?.bug_id },
    { label: "Bug Description  :", value: data?.bug_description },
    { label: "Project Name  :", value: data?.projectId?.title },
    { label: "Module Name  :", value: data?.moduleId?.module_name },
    { label: "Bug Type  :", value: data?.bug_type },
    { label: "Created By  :", value: data?.createdby },
    { label: "Assigned To  :", value: data?.assignedTo?.username },
    { label: "Reported By  :", value: data?.reportedBy?.username },
    { label: "Severity  :", value: data?.severity },
    { label: "Sprint  :", value: data?.sprint },
    { label: "Customer Found  :", value: data?.customerfound ? "Yes" : "No" },
    { label: "Status  :", value: data?.status },
    { label: "Created At  :", value: isoformattedDate },
    { label: "Estimated Date  :", value: formattedDate },
    { label: "Updated Date  :", value: isUpdatated },
  ];

  const headers = ["Bug_id", "Status", "Updated By", "Updated On"];

  function formatsDate(isoDateString) {
    const date = new Date(isoDateString);
    return `${date.toLocaleDateString()} ${convertTo12HourFormat(
      date.getHours(),
      date.getMinutes()
    )}`;
  }

  function convertTo12HourFormat(hours, mins) {
    if (hours >= 0 && hours <= 11) {
      return `${hours === 0 ? 12 : hours}:${mins} AM`;
    } else {
      return `${hours === 12 ? 12 : hours - 12}:${mins} PM`;
    }
  }

  const isAdmin = localStorage.getItem("role") === "admin" ? false : true;
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              navigate(
                hash === "#bugs"
                  ? "/dashboard/bugs"
                  : hash === "#submitted"
                  ? "/dashboard/submitted"
                  : "/dashboard/assigned"
              )
            }
            style={{
              marginBottom: "20px",
              background: "#398EED",
              color: "#ffffff",
              boxShadow: "1px 1px 8px 1px gray",
            }}
          >
            Back
          </Button>
        </div>
        <div>
          <Button onClick={() => setOpen(true)}>Edit</Button>
          {isAdmin ? "" : <DeleteBug data={data} hash={hash} />}
        </div>
      </div>
      <Typography variant="h6" sx={{ m: 2 }} color="initial">
        Detailed Bug Information
      </Typography>
      <TableContainer component={Paper} sx={{ padding: "16px" }}>
        <Table aria-label="detailed bug table">
          <TableBody>
            {details.map((detail, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: index % 2 === 0 ? "#F1F6F9" : "#FFFFFF",
                  borderBottom: "1px solid #e0e0e0",
                  padding: "8px",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "1px solid #e0e0e0",
                    paddingRight: "20px",
                  }}
                >
                  {detail.label}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                    paddingLeft: "20px",
                  }}
                >
                  {detail.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditBugDialog
        open={open}
        handleDialogClose={handleDialogClose}
        data={data}
        hash={hash}
      />
      <Typography variant="h6" sx={{ m: 2 }} color="initial">
        Bug Status History
      </Typography>
      <TableContainer component={Paper} sx={{ width: "100%", p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((heading) => (
                <TableCell key={heading}>{heading}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bugStatusData.length ? (
              bugStatusData?.map((statusData, index) => {
                const originalDateString = statusData?.createdAt;
                const formattedDate = formatsDate(originalDateString);
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: index % 2 === 0 ? "#F1F6F9" : "#FFFFFF",
                      borderBottom: "1px solid #e0e0e0",
                      padding: "8px",
                    }}
                  >
                    <TableCell>{statusData?.bug_id}</TableCell>
                    <TableCell>{statusData?.status}</TableCell>
                    <TableCell>{statusData?.updatedby}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                  <Typography variant="h6" color="initial">
                    No Records Found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DetailedBugs;
