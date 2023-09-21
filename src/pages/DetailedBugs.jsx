import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const DetailedBugs = () => {
  const location = useLocation();
  const data = location.state;

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
  const isUpdatated = formatDate(updatedDtate)

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
      <Typography variant="h6" sx={{ m: 2 }} color="initial">
        Detailed Bug Information
      </Typography>
      <TableContainer component={Paper} sx={{ padding: "16px" }}>
        <Table aria-label="detailed bug table">
          <TableBody>
            {details.map((detail, index) => (
              <TableRow key={index}>
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

