import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import {
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import apiService from "../services/apiService";
import SubStatusTable from "./SubStatusTable";
import CustomizedSnackbars from "./CustomizedSnackbars";
import StatusChangeDialog from "../components/StatusChangeDialog";


export default function BasicTableSub({ row, headers, handleClick, submitted }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [bugResponse, setBugResponse] = React.useState([]);
  const [expandedRow, setExpandedRow] = React.useState(null);
  const [filteredResponse, setFilteredResponse] = React.useState([]);
  const [changemsg, setChangemsg] = React.useState({});
  const [bugStatusData, setBugStatusData] = React.useState({});
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [updateSprint, setUpdateSprint] = React.useState("");




  const handleComment = async() => {
      const obj = {
          ...bugStatusData,
          comment
      }
      console.log(obj)
      
      const statusData = await apiService.putStatus(obj);
      if(!statusData.error){
        handleCloseDialog()
        setChangemsg(statusData)
      }
  }

  const heading = ["Bug_id", "Comments", "Status", "Updated By", "Updated On"];

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
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

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
  const handleChange = async (event, _id) => {
    let obj = {
      data: event.target.value,
      id: _id,
    };
    setUpdateSprint(event.target.value);
    const sprintData = await apiService.editSprint(obj);
    if (!sprintData.error) {
      
      const message = `Sprint updated to ${event.target.value}.`;
      setChangemsg({
        ...sprintData,
        message,
      })
      submitted()
    }
  };
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
              {headers &&
                headers.map((val) => <TableCell key={val}>{val}</TableCell>)}
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
                  const isRowExpanded = index === expandedRow;
                  return (
                    <>
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                          backgroundColor: isEvenRow ? "#f2f2f2" : "white",
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
                        <FormControl sx={{ m: 2 }} size="small">
                          <InputLabel></InputLabel>
                          <Select
                            value={row?.sprint}
                            onChange={(e) => {
                              handleChange(e, row?._id);
                            }}
                          >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="8">8</MenuItem>
                            <MenuItem value="9">9</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                          </Select>
                        </FormControl>
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
                              Submitted Bug Status History
                            </Typography>
                            <SubStatusTable
                              bugStatusData={filteredResponse}
                              headers={heading}
                              setExpandedRow={setExpandedRow}
                              load={bugStatusApi}
                            />
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={10} sx={{ textAlign: "center" }}>
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
          count={row.length}
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
