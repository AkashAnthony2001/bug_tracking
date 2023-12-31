import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";

export default function BasicDialog({ action, children, buttonMsg, sx }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    action();
  };

  return (
    <Box
      sx={{
        marginTop: "auto",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Tooltip
        title="Log Out"
        arrow
        color="success"
        placement="bottom"
      >
        <LogoutIcon
        size="small"
        sx={{ color: "black", cursor: "pointer" }}
        onClick={handleClickOpen}
      />
      </Tooltip>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{children}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAction} autoFocus>
            {buttonMsg}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
