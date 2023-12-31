import React, { useEffect, useState } from "react";

import { BarChart } from "@mui/x-charts/BarChart";

import apiService from "../services/apiService";
import SprintCount from "./SprintCount";

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

const SprintBarGraph = () => {
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
      label: "S1",

      value: "sprint1",
      
    },

    {
      label: "S2",

      value: "sprint2",
      color: "#6273E7"
    },

    {
      label: "S3",

      value: "sprint3",
    },

    {
      label: "S4",

      value: "sprint4",
    },

    {
      label: "S5",

      value: "sprint5",
    },

    {
      label: "S6",

      value: "sprint6",
    },

    {
      label: "S7",

      value: "sprint7",
    },

    {
      label: "S8",

      value: "sprint8",
    },

    {
      label: "S9",

      value: "sprint9",
    },

    {
      label: "S10",

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

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <label style={{ fontWeight: "bold", marginRight: "10px", marginBottom: "20px" }}>
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
            marginTop: "40px"
          }}
        >
          {sprintOptions.map((val) => (
            <option key={val.value} value={val.value}>
              {val.label}
            </option>
          ))}
        </select>
      </div>
      {sprintData.length > 0 ? (
        <BarChart
          dataset={mappedSprintData}
          yAxis={[{ scaleType: "band", dataKey: "user" }]}
          series={[
            {
              dataKey: selectedSprint,

              label: `${selectedSprint} bugs`,

              valueFormatter,
            },
          ]}
          layout="horizontal"
          {...chartSetting}
          sx={{ maxHeight: "350px" }}
        />
      ) : (
        <p>No Records Found</p>
      )}
    </div>
  );
};

export default SprintBarGraph;
