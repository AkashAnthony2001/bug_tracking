import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, DialogActions, Grid, TextField, Typography } from '@mui/material';

const EditCommentDialog = ({ isOpen, onClose, bugData, setComment, comment, handleComment }) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle style={{ backgroundColor: "#596e79", color: "white" }}>Add Comments</DialogTitle>
        <DialogContent sx={{ p: 3, }}>
          <Box sx={{ p: 1 }}><Typography variant="h6" color="initial">Your Selected Status : {bugData?.status}</Typography></Box>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Comments"
              multiline
              fullWidth
              name='comments'
              style={{ marginTop: "10px" }}
              size="small"
              rows={5}
              defaultValue=""
              value={comment}
              variant="outlined"
              onChange={(event) => { setComment(event.target.value) }}
            />
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mx: 1 }}>
          <Button
            onClick={() => {
              onClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleComment}>Add</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
};

export default EditCommentDialog;
