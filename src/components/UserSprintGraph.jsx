import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import apiService from "../services/apiService";

const chartSetting = {
  xAxis: [{ label: "Bugs Count" }],
  width: 500,
  height: 400,
};

export default function UserSprintGraph() {
  const [sprintData, setSprintData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const graphData = await apiService.getUserSprint();
      const filteredData = graphData?.filter(
        (data) => data.username === localStorage.getItem("username")
      );
      if (filteredData.length > 0) {
        setSprintData(filteredData);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {sprintData.map((userData) => (
        <BarChart
          key={userData.username}
          dataset={userData.sprints} 
          yAxis={[{ scaleType: "band", dataKey: "sprint" }]}
          series={[{ dataKey: "bugs", label: `${userData.username}'s Bugs` }]}
          layout="horizontal"
          {...chartSetting}
        />
      ))}
    </div>
  );
}
