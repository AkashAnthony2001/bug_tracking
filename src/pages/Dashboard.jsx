import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Header from "../components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Media from "react-media";
import apiService from "../services/apiService";
import Projects from "./Projects";
import "../components/dash.css";
import {
  Card,
  CardActionArea,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import WorkIcon from "@mui/icons-material/Work";
import SprintBarGraph from "../components/SprintBarGraph";
import UserBarGraph from "../components/UserBarGraph";
import UserSprintGraph from "../components/UserSprintGraph";
import AdminUsersGraph from "../components/AdminUsersGraph";
import SprintCount from "../components/SprintCount";

const drawerWidth = 190;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [assigned, setAssigned] = useState(0);
  const [close, setClose] = useState(0);
  const [inProcess, setInProcess] = useState(0);
  const [hold, setHold] = useState(0);
  const [resolved, setResolved] = useState(0);
  const [verified, setVerified] = useState(0);
  const [assignedValue, setAssignedvalue] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedSprint, setSelectedSprint] = useState(localStorage.getItem("currentSprint") ? localStorage.getItem("currentSprint") : 6);
  const checkAuth = async () => {
    const isAuth = await apiService.isAuth();
    if (!isAuth) {
      localStorage.clear();
      return navigate("/login");
    }
    return;
  };

  const cardStyle = {
    margin: "20px",
    marginBottom: "1rem",
    backgroundColor: "#F8F9FA",
    boxShadow: "0 7px 7px rgba(0, 0, 0.2, 0.2)",
    borderRadius: "8px",
  };

  const displayBugs = async () => {
    const username = localStorage.getItem("username");
    const data = await apiService.getAssignments(username);
    const assignedStaus =
      data &&
      data.filter((datas) => {
        return datas.status === "Assigned";
      }).length;
    setAssigned(assignedStaus);
    const closedStaus =
      data &&
      data.filter((datas) => {
        return datas.status === "Closed";
      }).length;
    setClose(closedStaus);
    const inProgressStaus =
      data &&
      data.filter((datas) => {
        return datas.status === "InProgress";
      }).length;
    setInProcess(inProgressStaus);
    const holdStaus =
      data &&
      data.filter((datas) => {
        return datas.status === "Hold";
      }).length;
    setHold(holdStaus);
    const resolvedStatus =
      data &&
      data.filter((datas) => {
        return datas.status === "Resolved";
      }).length;
    setResolved(resolvedStatus);
    const verifiedStatus =
      data &&
      data.filter((datas) => {
        return datas.status === "Verified";
      }).length;
    setVerified(verifiedStatus);
  };

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    if (token) {
      checkAuth();
    }
    Assigneddisplay();
  }, []);
  const Assigneddisplay = async () => {
    const username = localStorage.getItem("username");
    let data = await apiService.getAssignments(username);
    data = data.filter((_d) => _d.status == 'Opened' || _d.status == 'Hold' || _d.status == "Assigned" || _d.status == "InProgress")
    setAssignedvalue(data);
  };
  useEffect(() => {
    displayBugs();
    if (assignedValue.length) {
      const filterArr =
        assignedValue &&
        assignedValue?.filter((val) =>
          val.createdAt.includes(formattedNewDate)
        );
      setFilterData(filterArr);
    }
  }, [assignedValue]);

  const username = localStorage.getItem("name");
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  const d = new Date();

  const formattedNewDate = formatDate(d);

  const sprintOptions = [
    {
      label: "Sprint 1",

      value: "1",

    },

    {
      label: "Sprint 1",
      value: "2"
    },

    {
      label: "Sprint 3",

      value: "3",
    },

    {
      label: "Sprint 4",

      value: "4",
    },

    {
      label: "Sprint 5",

      value: "5",
    },

    {
      label: "Sprint 6",

      value: "6",
    },

    {
      label: "Sprint 7",

      value: "7",
    },

    {
      label: "Sprint 8",

      value: "8",
    },

    {
      label: "Sprint 9",

      value: "9",
    },

    {
      label: "Sprint 10",

      value: "10",
    }
  ];
  const handleSprintChange = (event) => {
    setSelectedSprint(event.target.value);
    localStorage.setItem("currentSprint",event.target.value)
  };
  return (
    <div>
      <CssBaseline>
        <Media
          queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px) and (max-width: 1199px)",
            large: "(min-width: 1200px)",
          }}
        >
          {(matches) => (
            <>
              {matches.small && (
                <Header drawerWidth={0} tmpbar={true} username={username} />
              )}
              {(matches.medium || matches.large) && (
                <Header drawerWidth={drawerWidth} username={username} />
              )}
            </>
          )}
        </Media>
        <Box sx={{ display: "flex" }}>
          <Media
            queries={{
              small: "(max-width: 599px)",
              medium: "(min-width: 600px) and (max-width: 1199px)",
              large: "(min-width: 1200px)",
            }}
          >
            {(matches) => (
              <>{(matches.medium || matches.large) && <Navbar />}</>
            )}
          </Media>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            {location.pathname === "/dashboard/" ? (
              <Projects />
            ) : location.pathname === "/dashboard" ? (
              <>
                <Grid container>
                  <Grid item md={6} lg={2}>
                    <Card style={cardStyle}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {assigned}
                          </Typography>
                          <Typography variant="h7" color="#1b2b4e">
                            Assigned
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item md={6} lg={2}>
                    <Card style={cardStyle}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {close}
                          </Typography>
                          <Typography variant="h7" color="#1b2b4e">
                            Closed
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item md={6} lg={2}>
                    <Card style={cardStyle}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {inProcess}
                          </Typography>
                          <Typography variant="h7" color="#1b2b4e">
                            In Progress
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item md={6} lg={2}>
                    <Card style={cardStyle}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {hold}
                          </Typography>
                          <Typography variant="h7" color="#1b2b4e">
                            Hold
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item md={6} lg={2}>
                    <Card style={cardStyle}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {resolved}
                          </Typography>
                          <Typography variant="h7" color="#1b2b4e">
                            Resolved
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item md={6} lg={2}>
                    <Card style={cardStyle}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {verified}
                          </Typography>
                          <Typography variant="h7" color="#1b2b4e">
                            Verified
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
                <div className="bigCards">
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <div>
                        <Card style={cardStyle}>
                          <CardContent>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                padding: "3px",
                              }}
                            >
                              <BugReportIcon sx={{ color: "#2F96FC" }} />
                              <h3 style={{ marginLeft: "15px" }}> My Open Bugs ({assignedValue.length})</h3>
                            </div>
                            <TableContainer
                              sx={{
                                maxHeight: "220px",
                                overflowY: "scroll",
                                height: "220px",
                              }}
                            >
                              <Table>
                                <TableHead
                                  sx={{
                                    position: "sticky",
                                    top: 0,
                                    bgcolor: "white",
                                  }}
                                >
                                  <TableRow>
                                    <TableCell>Bug</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {assignedValue.length ? (
                                    assignedValue.map((data) => {
                                      const originalDateString = data.createdAt;
                                      const formattedDate =
                                        formatDate(originalDateString);
                                      return (
                                        <TableRow
                                          key={data.bug_id}
                                          sx={{ background: "white" }}
                                        >
                                          <TableCell>{data.bug_id}</TableCell>
                                          <TableCell>{formattedDate}</TableCell>
                                          <TableCell>{data.status}</TableCell>
                                        </TableRow>
                                      );
                                    })
                                  ) : (
                                    <TableRow>
                                      <TableCell
                                        colSpan={2}
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
                            </TableContainer>
                          </CardContent>
                        </Card>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div>
                        <Card style={cardStyle}>
                          <CardContent>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                padding: "3px",
                              }}
                            >
                              <WorkIcon sx={{ color: "#2F96FC" }} />
                              <h3 style={{ marginLeft: "15px" }}>
                                {" "}
                                My Work Items Due Today
                              </h3>
                            </div>
                            <TableContainer
                              sx={{
                                maxHeight: "220px",
                                overflowY: "scroll",
                                height: "220px",
                              }}
                            >
                              <Table>
                                <TableHead
                                  sx={{
                                    position: "sticky",
                                    top: 0,
                                    bgcolor: "white",
                                  }}
                                >
                                  <TableRow>
                                    <TableCell>Bug</TableCell>
                                    <TableCell>Date</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {filterData.length ? (
                                    filterData.map((val) => {
                                      return (
                                        <TableRow
                                          key={filterData.bug_id}
                                          sx={{ background: "white" }}
                                        >
                                          <TableCell>{val.bug_id}</TableCell>
                                          <TableCell>
                                            {formatDate(val.createdAt)}
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })
                                  ) : (
                                    <TableRow>
                                      <TableCell
                                        colSpan={2}
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
                            </TableContainer>
                          </CardContent>
                        </Card>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <div>
                        <Card style={cardStyle}>
                          <CardContent>
                            <h3>
                              {" "}
                              Settings
                            </h3>
                            Current Sprint : <select value={selectedSprint} onChange={handleSprintChange}
                              style={{
                                padding: "8px",

                                border: "1px solid #ccc",

                                borderRadius: "4px",

                                marginRight: "10px",
                                marginTop: "40px"
                              }}
                            >
                              {sprintOptions.map((val) => (
                                <option key={val.value} value={val.value}>
                                  {val.label}
                                </option>
                              ))}
                            </select>
                          </CardContent>
                        </Card>
                      </div>
                    </Grid>
                    {localStorage.getItem("role") === "admin" && (
                      <>
                        <SprintCount />
                      </>
                    )}

                    <Grid item xs={12} md={6}>
                      <div style={{ padding: 2 }}>
                        <Card style={{ ...cardStyle, height: "500px" }}>
                          <CardContent
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              width: "100%",
                            }}
                          >
                            {localStorage.getItem("role") === "admin" ? (
                              <SprintBarGraph />
                            ) : (
                              <UserSprintGraph />
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div style={{ padding: 2 }}>
                        <Card style={{ ...cardStyle, height: "500px" }}>
                          <CardContent
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              width: "100%",
                            }}
                          >
                            {localStorage.getItem("role") === "admin" ? (
                              <AdminUsersGraph />
                            ) : (
                              <UserBarGraph
                                assigned={assigned}
                                closed={close}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </>
            ) : (
              <Outlet />
            )}
          </Box>
        </Box>
      </CssBaseline>
    </div>
  );
};

export default Dashboard;
