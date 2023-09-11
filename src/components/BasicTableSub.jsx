import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import apiService from "../services/apiService";
import CustomizedSnackbars from "./CustomizedSnackbars";

export default function BasicTableSub({
  row,
  headers,
  handleClick,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [record, setRecord] = React.useState({});
  const [selectedStatus, setSelectedStatus] = React.useState([]);

  // const [defaults, setDefaults] = React.useState();
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // console.log(defaults, "jgdjgsjghdv");
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };


  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }
  // console.log(record);

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  }

  const handleStatus = async (event, id) => {
    let obj = {
      status: event.target.value,
      _id: id,
    };
    setSelectedStatus(event.target.value);
    const statusData = await apiService.putStatus(obj);
    console.log(statusData);
  };

  return (
    <TableContainer component={Paper}  sx={{ backgroundColor: "#EFEFEF", padding: "16px" }}>
      <Table aria-label="tickets table" stickyHeader sx={{ border: '1px solid #ccc', width: '100%' }}>
        <TableHead>
          <TableRow>
            {headers && headers.map((val) => <TableCell>{val}</TableCell>)}
          </TableRow>
        </TableHead>

        <TableBody>
          {row.length ? (
            row
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const originalDateString = row.estimate_date;
                const formattedDate = formatDate(originalDateString);
                const isoDateString = row.createdAt;
                const isoformattedDate = formatDate(isoDateString);
                const isEvenRow = index % 2 === 0;
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                      backgroundColor: isEvenRow ? "#f2f2f2" : "white", border: '1px solid #ccc',
                      padding: '8px',
                    }}
                    onClick={() => {
                      handleClick(row.id);
                    }}
                    tabIndex={-1}
                  >
                    <TableCell component="th" scope="row">
                      {row?.projectId?.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.moduleId?.module_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.assignedTo?.username}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.reportedBy?.username}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.sprint}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.customerfound ? "Yes" : "No yet"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {formattedDate}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.createdby}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {isoformattedDate}
                    </TableCell>
                    <FormControl sx={{ m: 2 }} size="small">
                        <InputLabel ></InputLabel>
                        <Select
                        defaultValue={row?.status}
                        onChange={(e) => {
                          handleStatus(e, row._id);
                        }}
                      >
                          {Object.entries(statusColors).map(
                            ([status, color]) => (
                              <MenuItem key={status} value={status}>
                                <span style={{ color }}>{status}</span>
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    {/* <TableCell component="th" scope="row">
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
                    </TableCell> */}

                    <TableCell align="right">{row?.type}</TableCell>
                  </TableRow>
                );
              })
          ) : (
            <TableRow>
              <TableCell
                colSpan={10}
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
        count={row.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
