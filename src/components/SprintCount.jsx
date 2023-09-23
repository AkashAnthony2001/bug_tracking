import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { Card, Typography, Grid } from "@mui/material";
const chartSetting = {
  xAxis: [
    {
      label: "Bugs",
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value) => `${value}`;

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

  const cardStyle = {
    minWidth: 275,
    marginBottom: "16px",
    marginLeft: "50px",
    marginRight: "70px",

    backgroundColor: "#F8F9FA",
    borderRadius: "8px",
    padding: "16px",
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "16px",
    paddingBottom:"15px"

  };

  return (
    <Card
      sx={{
        marginLeft: "30px",
        marginRight: "20px",
        backgroundColor: "#F8F9FA",
        boxShadow: "0 7px 7px rgba(0, 0, 0.2, 0.2)",
        borderRadius: "8px",
        marginBottom: "16px",
        marginTop: "16px",
      }}
    >
        <div style={{ textAlign: "center" }}>
      <label style={{ fontWeight: "bold", marginRight: "10px" }}>
        Select Sprint:
      </label>
      <select
        value={selectedSprint}
        onChange={handleSprintChange}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginRight: "10px",
          marginTop: "16px",
        }}
      >
        {sprintOptions.map((val) => (
          <option key={val.value} value={val.value}>
            {val.label}
          </option>
        ))}
      </select>
    </div>
    <br />
    
    <div style={gridContainerStyle}>
      {statusCounts &&
        Object.entries(
          statusCounts.find(([sprint]) => sprint === selectedSprint)[1]
        ).map(([status, count]) => (
          <Card style={cardStyle} key={status}>
            <Typography>
                <Typography gutterBottom variant="h5" component="div">{count}</Typography>
                <Typography variant="h7">{status}</Typography>

            </Typography>
          </Card>
        ))}
    </div>
  </Card>
);
};

export default SprintCount;
