import React,{useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import EditCommentDialog from "./EditCommentDialog";
import apiService from "../services/apiService";

function SubStatusTable({ bugStatusData, headers, setExpandedRow, load }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editData, setEditData] = useState();
  const [comment, setComment] = useState("");

  const handleCloseDialog = () => {
    resetCommentField();
    setIsDialogOpen(false);
  };

  const resetCommentField = () => {
    setComment("");
  };

  const handleComment = async () => {
    if (!editData) return;

    const { _id } = editData;
    const obj = {
      comment,
    };
    load();
    setExpandedRow(null);
    const statusData = await apiService.editComment(obj, _id);
    if (!statusData.error) {
      resetCommentField();
      handleCloseDialog();
    }
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    return `${date.toLocaleDateString()} ${convertTo12HourFormat(
      date.getHours(),
      date.getMinutes()
    )}`;
  }

  function convertTo12HourFormat(hours, mins) {
    if (hours >= 0 && hours <= 11) {
      return `${hours === 0 ? 12 : hours}:${mins} AM`;
    } else {
      return `${hours === 12 ? 12 : hours - 12}:${mins} PM`;
    }
  }
  useEffect(()=>{
    if(editData){
      setComment(editData?.comments)
    }
  
  },[editData])
  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%", p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((heading) => (
                <TableCell key={heading}>{heading}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bugStatusData.length ? (
              bugStatusData?.map((statusData, index) => {
                const originalDateString = statusData?.createdAt;
                const formattedDate = formatDate(originalDateString);
                const isLastItem = index === bugStatusData.length - 1;

                return (
                  <TableRow key={statusData?.bug_id}>
                    <TableCell>{statusData?.bug_id}</TableCell>
                    <TableCell>
                      {statusData?.comments}
                      {isLastItem && (
                        <Button
                          onClick={() => {
                            setEditData(statusData);
                            setIsDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>{statusData?.status}</TableCell>
                    <TableCell>{statusData?.updatedby}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                  <Typography variant="h6" color="initial">
                    No Records Found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <EditCommentDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        bugData={editData}
        setComment={setComment}
        comment={comment}
        handleComment={handleComment}
      />
    </>
  );
}

export default SubStatusTable;
