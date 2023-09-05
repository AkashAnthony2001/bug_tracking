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
import "../components/index.css";
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

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [myBugs, setMyBugs] = useState([]);
  const [open, setOpen] = useState(0);
  const [close, setClose] = useState(0);
  const [assignedValue, setAssignedvalue] = useState([]);

  const token = localStorage.getItem("token");

  const checkAuth = async () => {
    const isAuth = await apiService.isAuth();
    if (!isAuth) {
      localStorage.clear();
      return navigate("/login");
    }
    return;
  };

  const displayBugs = async () => {
    const username = localStorage.getItem("username");
    const data = await apiService.getAssignments(username);
    setMyBugs(data);
    // console.log(myBugs);
    const setOpened = data.filter((datas) => {
      return datas.status === "Opened";
    }).length;
    setOpen(setOpened);
    const setClosed = data.filter((datas) => {
      return datas.status === "Closed";
    }).length;
    setClose(setClosed);
  };

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    if (token) {
      checkAuth();
    }
  }, []);
  const Assigneddisplay = async () => {
    const username = localStorage.getItem("username");
    const data = await apiService.getAssignments(username);
    setAssignedvalue(data);
  };
  useEffect(() => {
    displayBugs();
    Assigneddisplay();
  }, []);

  // console.log(assignedValue);

  const username = localStorage.getItem("name");
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  }

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
                <div className="container">
                  <div className="card">
                    <Card>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {open}
                          </Typography>
                          <Typography variant="h7" color="black">
                            Open Bugs
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                  <div className="card">
                    <Card>
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
                  </div>
                  <div className="card">
                    <Card>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            0
                          </Typography>
                          <Typography variant="h7" color="black">
                            Closed Bugs
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                  <div className="card">
                    <Card>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            0
                          </Typography>
                          <Typography variant="h7" color="black">
                            Closed Bugs
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                </div>
                <div className="bigCards">
                  <Grid container spacing={2} >
                    <Grid item xs={6} >
                      <div>
                        <Card >
                          <CardContent>
                            <h2>{<BugReportIcon />} My Bugs</h2>
                            <TableContainer  sx={{maxHeight:"500px",overflowY:'scroll'}}>
                              <Table >
                                <TableHead sx={{position:'sticky',top:0,bgcolor:'white'}}>
                                  <TableRow>
                                    <TableCell>Bug</TableCell>
                                    <TableCell>Date</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody >
                                  {assignedValue.length && assignedValue.map((data) => {
                                    const originalDateString = data.createdAt;
                                    const formattedDate = formatDate(originalDateString);
                                    return (
                                      <TableRow>
                                        <TableCell>{data.bug_id}</TableCell>
                                        <TableCell>{formattedDate}</TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </CardContent>
                        </Card>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <Card>
                          <CardContent>
                            <h2>{<WorkIcon />} My Work Items Due Today</h2>
                            <TableContainer>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Header 1</TableCell>
                                    <TableCell>Header 2</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Data 1</TableCell>
                                    <TableCell>Data 2</TableCell>
                                  </TableRow>
                                  {/* Add more rows as needed */}
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
