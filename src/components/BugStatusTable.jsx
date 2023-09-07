import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const BugStatusTable = ({ bugStatusData, headers }) => {
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
    <TableContainer component={Paper} sx={{ width: '100%' , p:2 }} >
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((heading) => (
              <TableCell key={heading}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bugStatusData.length ? bugStatusData?.map((statusData) => {
            const originalDateString = statusData?.createdAt;
            const formattedDate = formatDate(originalDateString);
            return (
              <TableRow key={statusData?.bug_id}>
                <TableCell>{statusData?.bug_id}</TableCell>
                <TableCell>{statusData?.status}</TableCell>
                <TableCell>{statusData?.createdby?.username}</TableCell>
                <TableCell>{formattedDate}</TableCell>
              </TableRow>
            );
          }):<Typography variant='h6'>No Records Found</Typography>}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BugStatusTable;
