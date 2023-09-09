import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { MenuItem, Select, Typography } from "@mui/material";
import apiService from "../services/apiService";

export default function BasicTable({ rows, heading, handleClick }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedStatus, setSelectedStatus] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatus = async (event, id) => {
    let obj = {
      status: event.target.value,
      _id: id,
    };
    setSelectedStatus(event.target.value);
    const statusData = await apiService.putStatus(obj);
    console.log(statusData);
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // Ensure day and month have two digits
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="tickets table" stickyHeader>
        <TableHead>
          <TableRow>
            {heading && heading.map((data) => <TableCell>{data}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length ? (
            rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const originalDateString = row.estimate_date;
                const formattedDate = formatDate(originalDateString);
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleClick(row.id);
                    }}
                    tabIndex={-1}
                  >
                    <TableCell>{row?.projectId?.title}</TableCell>
                    <TableCell>{row?.moduleId?.module_name}</TableCell>
                    <TableCell>{row?.assignedTo?.username}</TableCell>
                    <TableCell>{row?.reportedBy?.name}</TableCell>
                    <TableCell>{row?.sprint}</TableCell>
                    <TableCell>{row?.customerfound ? "Yes" : "No"}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={row?.status}
                        onChange={(e) => {
                          handleStatus(e, row._id);
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
                );
              })
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                sx={{ textAlign: "center" }}
              >
                <Typography
                  variant="h6"
                  color="initial"
                >
                  No Records Found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
