import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Collapse from "@mui/material/Collapse";
import AssiStatusTable from "./AssiStatusTable";
import CustomizedSnackbars from "./CustomizedSnackbars";
import StatusChangeDialog from "../components/StatusChangeDialog";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import apiService from "../services/apiService";

export default function BasicTable({ rows, heading, handleClick }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [bugResponse, setBugResponse] = React.useState([]);
  const [expandedRow, setExpandedRow] = React.useState(null);
  const [filteredResponse, setFilteredResponse] = React.useState([]);
  const [changemsg, setChangemsg] = React.useState({});
  const [bugStatusData, setBugStatusData] = React.useState({});
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const handleComment = async() => {
    const obj = {
        ...bugStatusData,
        comment
    }
    console.log(obj)
    
    const statusData = await apiService.putStatus(obj);
    if(!statusData.error){
      handleCloseDialog()
      setChangemsg(statusData);
    }
}

  const headers = ["Bug_id", "Comments" , "Status", "Updated By", "Updated On"];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const statusColors = {
    Opened: "	#32cd32",
    Assigned: "blue",
    InProgress: "#800000",
    Resolved: "purple",
    Testing: "orange",
    Verified: "	#32cd32",
    Closed: "red",
    Hold: "#708090",
  };
  const handleStatus = async (event, id) => {
    setIsDialogOpen(true);
    setComment("")

    let obj = {
      status: event.target.value,
      updatedby: localStorage.getItem("name"),
      _id: id,
    };
    setBugStatusData(obj)

    
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
  const bugStatusApi = async () => {
    const bugStatusResponse = await apiService.bugStatus();
    setBugResponse(bugStatusResponse);
  };
  const collapseRow = (index, bugid) => {
    setExpandedRow(index === expandedRow ? null : index);
    const filteredData = bugResponse.response.filter((data) => {
      return data.bug_id === bugid;
    });
    setFilteredResponse(filteredData);
  };
  React.useEffect(() => {
    bugStatusApi();
  }, [changemsg]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#EFEFEF", padding: "16px" }}
      >
        <Table
          aria-label="tickets table"
          stickyHeader
          sx={{ border: "1px solid #ccc", width: "100%" }}
        >
          <TableHead>
            <TableRow>
              {heading &&
                heading.map((data) => <TableCell key={data}>{data}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const originalDateString = row.estimate_date;
                  const formattedDate = formatDate(originalDateString);
                  const isOddRow = index % 2 === 0;
                  const isRowExpanded = index === expandedRow;
                  return (
                    <>
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                          backgroundColor: isOddRow ? "#EDEDED" : "#FFFFFF",
                          border: "1px solid #ccc",
                          padding: "8px",
                        }}
                        onClick={() => {
                          handleClick(row.id);
                        }}
                        tabIndex={-1}
                      >
                        <TableCell>
                        <Button
                          variant="text"
                          onClick={() => collapseRow(index, row?.bug_id)}
                          style={{
                            backgroundColor: "#596e79",
                            color: "white",
                            padding: "4px 8px",
                          }}
                        >
                          {row?.bug_id}
                        </Button>
                        </TableCell>
                        <TableCell>{row?.projectId?.title}</TableCell>
                        <TableCell>{row?.moduleId?.module_name}</TableCell>
                        <TableCell>{row?.assignedTo?.username}</TableCell>
                        <TableCell>{row?.reportedBy?.name}</TableCell>
                        <TableCell>{row?.sprint}</TableCell>
                        <TableCell>
                          {row?.customerfound ? "Yes" : "No"}
                        </TableCell>
                        <TableCell>{formattedDate}</TableCell>
                        <FormControl sx={{ m: 2 }} size="small">
                          <InputLabel></InputLabel>
                          <Select
                            defaultValue={row?.status}
                            onChange={(e) => {
                              handleStatus(e, row?._id);
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
                              Assigned Bug Status History
                            </Typography>
                            <AssiStatusTable
                              bugStatusData={filteredResponse}
                              headers={headers}
                              load={bugStatusApi}
                              setExpandedRow={setExpandedRow}
                            />
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={8} sx={{ textAlign: "center" }}>
                  <Typography variant="h6" color="initial">
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
      <StatusChangeDialog isOpen={isDialogOpen} onClose={handleCloseDialog} bugData={bugStatusData} setComment={setComment} comment={comment} handleComment={handleComment}/>
      <CustomizedSnackbars
        error={changemsg.error}
        message={changemsg.message}
        setChangemsg={setChangemsg}
      />
    </>
  );
}
