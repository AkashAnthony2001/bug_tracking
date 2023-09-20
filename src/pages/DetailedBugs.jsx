import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

const DetailedBugs = () => {
  const location = useLocation();
  const data = location.state;
    console.log(data, "dddd");
  const headers = [
    "projectName",
    "moduleName",
    "bugType",
    "createdBy",
    "assignedTo",
    "reportedBy",
    "severity",
    "sprint",
    "status",
    "createdAt",
    "updatedAt",
  ];

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
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#EFEFEF", padding: "16px" }}
      >
        <Typography variant="h6" sx={{m:2}} color="initial">Bug Id : {data?.bug_id}</Typography>
        <Table
          aria-label="tickets table"
          stickyHeader
          sx={{ border: "1px solid #ccc", width: "100%" }}
        >
          <TableHead>
            <TableRow>
              {headers &&
                headers.map((data) => (
                  <TableCell sx={{ textAlign: "center" }} key={data}>
                    {data}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={data._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                border: "1px solid #ccc",
                padding: "8px",
              }}
            >
              <TableCell
                sx={{ textAlign: "center" }}
                component="th"
                scope="row"
              >
                {data?.projectId?.title}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center" }}
                component="th"
                scope="row"
              >
                {data?.moduleId?.module_name}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center" }}
                component="th"
                scope="row"
              >
                {data?.bug_type}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center" }}
                component="th"
                scope="row"
              >
                {data?.createdby}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center" }}
                component="th"
                scope="row"
              >
                {data?.assignedTo?.username}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center" }}
                component="th"
                scope="row"
              >
                {data?.reportedBy?.username}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center" }}
                component="th"
                scope="row"
              >
                {data?.severity}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center" }}
                component="th"
                scope="row"
              >
                {data?.sprint}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center" }}
                component="th"
                scope="row"
              >
                {data?.status}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center" }}
                component="th"
                scope="row"
              >
                {isoformattedDate}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center" }}
                component="th"
                scope="row"
              >
                {formattedDate}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DetailedBugs;
