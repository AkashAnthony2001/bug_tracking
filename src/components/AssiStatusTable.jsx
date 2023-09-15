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

function AssiStatusTable({ bugStatusData, headers }) {
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    return `${date.toLocaleDateString()} ${convertTo12HourFormat(date.getHours(),date.getMinutes())}`;
  }

  function convertTo12HourFormat(hours,mins) {
    if (hours >= 0 && hours <= 11) {
      return `${hours === 0 ? 12 : hours}:${mins} AM`;
    } else {
      return `${hours === 12 ? 12 : hours - 12}:${mins} PM`;
    }
  }

  return (
    <TableContainer component={Paper} sx={{ width: '100%', p: 2 }} >
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
          }) : <TableRow>
            <TableCell
              colSpan={4}
              sx={{ textAlign: "center" }}
            >
              <Typography
                variant="h6"
                color="initial"
              >
                No Records Found
              </Typography>
            </TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssiStatusTable
