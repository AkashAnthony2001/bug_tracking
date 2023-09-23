import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import {
  Card,
  Typography,
  Grid,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  CardContent,
  CardActionArea,
} from "@mui/material";

const SprintCount = () => {
  const [sprintData, setSprintData] = useState([]);
  const [selectedSprint, setSelectedSprint] = useState("sprint1");
  const [statusCounts, setStatusCounts] = useState(null);

  const handleSprintChange = (event) => {
    setSelectedSprint(event.target.value);
  };

  const getBugsBySprint = async () => {
    const graphData = await apiService.getBySprint(selectedSprint);
    setSprintData(graphData.response);
    setStatusCounts(graphData.sprintCount);
  };

  const sprintOptions = [
    {
      label: "Sprint 1",
      value: "sprint1",
    },
    {
      label: "Sprint 2",
      value: "sprint2",
    },
    {
      label: "Sprint 3",
      value: "sprint3",
    },
    {
      label: "Sprint 4",
      value: "sprint4",
    },
    {
      label: "Sprint 5",
      value: "sprint5",
    },
    {
      label: "Sprint 6",
      value: "sprint6",
    },
    {
      label: "Sprint 7",
      value: "sprint7",
    },
    {
      label: "Sprint 8",
      value: "sprint8",
    },
    {
      label: "Sprint 9",
      value: "sprint9",
    },
    {
      label: "Sprint 10",
      value: "sprint10",
    },
  ];

  useEffect(() => {
    getBugsBySprint();
  }, [selectedSprint]);

  const mappedSprintData = sprintData.map((item) => ({
    user: item.user,
    [selectedSprint]: item[selectedSprint],
  }));
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const cardStyle = {
    margin: "20px",

    marginBottom: "1rem",
    backgroundColor: "#F8F9FA",
    borderRadius: "8px",
    paddingRight: "55px",
  };

  return (
    <Card
      sx={{
        marginLeft: isMediumScreen ? "30px" : "10px",
        marginRight: isMediumScreen ? "30px" : "10px",
        backgroundColor: "#F8F9FA",
        boxShadow: "0 7px 7px rgba(0, 0, 0.2, 0.2)",
        borderRadius: "8px",
        marginBottom: "16px",
        marginTop: "16px",
        padding: '10px'
      }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", marginRight: "10px" }}
          >
            Select Sprint:
          </Typography>
        </Grid>
        <Grid item>
          <Select
            size="small"
            value={selectedSprint}
            onChange={handleSprintChange}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {sprintOptions.map((val) => (
              <MenuItem key={val.value} value={val.value}>
                {val.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        {statusCounts &&
          Object.entries(
            statusCounts.find(([sprint]) => sprint === selectedSprint)[1]
          ).map(([status, count]) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={status}>
              <Card style={cardStyle}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h5" component="div">{count}</Typography>
                    <Typography variant="subtitle1" component="div">{status}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Card>
  );
};

export default SprintCount;
