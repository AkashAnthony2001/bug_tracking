import { useEffect, useState } from "react";
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

const drawerWidth = 190;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(0);
  const [close, setClose] = useState(0);
  const [inProcess, setInProcess] = useState(0);
  const [hold, setHold] = useState(0);

  const [assignedValue, setAssignedvalue] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const token = localStorage.getItem("token");

  const checkAuth = async () => {
    const isAuth = await apiService.isAuth();
    if (!isAuth) {
      localStorage.clear();
      return navigate("/login");
    }
    return;
  };
  const cardStyle = {
    minWidth: 275,
    margin: "20px",
    marginBottom: "1rem",
    backgroundColor: "#ececec",
    boxShadow: "0 7px 7px rgba(0, 0, 0.2, 0.2)",
    borderRadius: "8px",
  };

  const displayBugs = async () => {
    const username = localStorage.getItem("username");
    const data = await apiService.getAssignments(username);

    const setOpened = data.filter((datas) => {
      return datas.status === "Assigned";
    }).length;
    setOpen(setOpened);
    const setClosed = data.filter((datas) => {
      return datas.status === "Closed";
    }).length;
    setClose(setClosed);
    const setIdProcessed = data.filter((datas) => {
      return datas.status === "InProgress";
    }).length;
    setInProcess(setIdProcessed);

    const setHolded = data.filter((datas) => {
      return datas.status === "Hold";
    }).length;
    setHold(setHolded);
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
    const data = await apiService.getAssignments(username);
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

  console.log(assignedValue);

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

  // console.log(d.toISOString())
  const formattedNewDate = formatDate(d);

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
              {matches.medium && (
                <Header drawerWidth={drawerWidth} username={username} />
              )}
              {matches.large && (
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
              <>
                {matches.medium && <Navbar />}
                {matches.large && <Navbar />}
              </>
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
                <Grid container spacing={4}>
                  <Grid item xs={3}>
                    <Card style={cardStyle}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {open}
                          </Typography>
                          <Typography variant="h7" color="black">
                            Assigned Bugs
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={3}>
                    <Card style={cardStyle}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {close}
                          </Typography>
                          <Typography variant="h7" color="black">
                            Closed Bugs
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={3}>
                    <Card style={cardStyle}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {inProcess}
                          </Typography>
                          <Typography variant="h7" color="black">
                            In Progress
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={3}>
                    <Card style={cardStyle}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {hold}
                          </Typography>
                          <Typography variant="h7" color="black">
                            Hold
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
                <div className="bigCards">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div>
                        <Card style={cardStyle}>
                          <CardContent>
                            <h2>{<BugReportIcon />} My Bugs</h2>
                            <TableContainer
                              sx={{ minHeight: "220px", overflowY: "scroll" }}
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
                                  {assignedValue.length ? (
                                    assignedValue.map((data) => {
                                      const originalDateString = data.createdAt;
                                      const formattedDate =
                                        formatDate(originalDateString);
                                      return (
                                        <TableRow key={data.bug_id} sx={{background:"white"}}>
                                          <TableCell>{data.bug_id}</TableCell>
                                          <TableCell>{formattedDate}</TableCell>
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
                    <Grid item xs={6}>
                      <div>
                        <Card style={cardStyle}>
                          <CardContent>
                            <h2>{<WorkIcon />} My Work Items Due Today</h2>
                            <TableContainer
                              sx={{ minHeight: "220px", overflowY: "scroll" }}
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
                                  {filterData.length
                                    ? filterData.map((val) => {
                                        return (
                                          <TableRow  key={filterData.bug_id} sx={{background:"white"}}>
                                            <TableCell>{val.bug_id}</TableCell>
                                            <TableCell>
                                              {formatDate(val.createdAt)}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })
                                    :(
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
