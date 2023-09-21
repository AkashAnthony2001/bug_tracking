import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const DetailedBugs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const hash = location.hash;
  console.log(hash);
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}-${formattedMonth}-${year}`;
  }

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

  return (
    <>
      <Button
        onClick={() =>
          navigate(
            hash === "#bugs"
              ? "/dashboard/bugs"
              : hash === "#submitted"
              ? "/dashboard/submitted"
              : "/dashboard/assigned"
          )
        }
        variant="outlined"
        size="small"
        style={{
          marginBottom: "0px",
          background: "#398EED",
          color: "#ffffff",
          boxShadow: "3px 2px 10px 0px gray",
        }}
      >
        Back
      </Button>
      <Typography variant="h6" sx={{ m: 2 }} color="initial">
        Detailed Bug Information
      </Typography>
      <TableContainer component={Paper} sx={{ padding: "16px" }}>
        <Table aria-label="detailed bug table">
          <TableBody>
            {details.map((detail, index) => (
              <TableRow key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: index % 2 === 0 ? "#F1F6F9" : "#FFFFFF",
                borderBottom: "1px solid #e0e0e0",
                padding: "8px",
              }}>
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
    </>
  );
};

export default DetailedBugs;
