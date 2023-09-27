import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import apiService from '../services/apiService';


const AdminUsersGraph = () => {
  const [adminUser, setAdminUser] = useState([]);

  const getAdminUserData = async () => {
    try {
      const responseData = await apiService.adminUserData();
      setAdminUser(responseData.response);
    } catch (error) {
      console.error('Error fetching admin user data:', error);
    }
  };

  useEffect(() => {
    getAdminUserData();
  }, []);
  if (!adminUser || adminUser.length === 0) {
    return <div>No records Found</div>;
  }

  const xAxisData = adminUser && adminUser?.map((item) => item.username);

  const seriesData = [
    {
      data: adminUser && adminUser?.map((item) => item.Closed),
      label: 'Closed',
    },
    {
      data: adminUser && adminUser?.map((item) => item.Assigned),
      label: 'Assigned',
    },
    {
      data: adminUser && adminUser?.map((item)=> item.InProgress),
      label: 'InProgress'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Overall Bugs</h3>
      <BarChart
        xAxis={[{ scaleType: 'band', data: xAxisData }]}
        series={seriesData}
        width={500}
        height={300}
      />
    </div>
  );
};

export default AdminUsersGraph;
