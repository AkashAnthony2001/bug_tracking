import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import apiService from '../services/apiService';

const chartSetting = {
    xAxis: [
        {
            label: 'Bugs',
        },
    ],
    width: 500,
    height: 400,
};

const valueFormatter = (value) => `${value}mm`;

const SprintBarGraph = () => {
    const [sprintData, setSprintData] = useState([]);
    const [selectedSprint, setSelectedSprint] = useState('sprint1');

    const handleSprintChange = (event) => {
        setSelectedSprint(event.target.value);
    };

    const getBugsBySprint = async () => {
        const graphData = await apiService.getBySprint();
        setSprintData(graphData.response);
    };
    const sprintOptions = [
        {
            label: "Sprint 1",
            value: 'sprint1'
        },
        {
            label: "Sprint 2",
            value: 'sprint2'
        },
        {
            label: "Sprint 3",
            value: 'sprint3'
        },
        {
            label: "Sprint 4",
            value: 'sprint4'
        },
        {
            label: "Sprint 5",
            value: 'sprint5'
        },
        {
            label: "Sprint 6",
            value: 'sprint6'
        },
        {
            label: "Sprint 7",
            value: 'sprint7'
        },
        {
            label: "Sprint 8",
            value: 'sprint8'
        },
        {
            label: "Sprint 9",
            value: 'sprint9'
        },
        {
            label: "Sprint 10",
            value: 'sprint10'
        },
    ]
    useEffect(() => {
        getBugsBySprint();
    }, []);

    // You should map the data inside the render function, not outside
    const mappedSprintData = sprintData.map((item) => ({
        user: item.user,
        [selectedSprint]: item[selectedSprint],
    }));

    return (
        <div>
            <div style={{textAlign:'center'}}>
                <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                    Select Sprint:
                </label>
                <select value={selectedSprint} onChange={handleSprintChange} style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginRight: "10px",
                }}>
                    {sprintOptions.map((val) => (
                        <option key={val.value} value={val.value}>{val.label}</option>
                    ))}
                </select>
            </div>
            {sprintData.length > 0 ? (
                <BarChart
                    dataset={mappedSprintData}
                    yAxis={[{ scaleType: 'band', dataKey: 'user' }]}
                    series={[{ dataKey: selectedSprint, label: `${selectedSprint} bugs`, valueFormatter }]}
                    layout="horizontal"
                    {...chartSetting}
                    sx={{ maxHeight: '350px' }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SprintBarGraph;
