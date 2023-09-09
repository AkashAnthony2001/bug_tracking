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
    

    return `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()} ${date.getHours >= 12 ? "PM" : "AM"}`  ;
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
                <TableCell>{statusData?.updatedby}</TableCell>
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
