import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import NotificationBell from "./NotificationBell";
import UserAvatar from "./UserAvatar";

const Header = ({ drawerWidth, tmpbar = false, username }) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const name = localStorage.getItem("name");

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "#e7e6e1",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
         
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "black" }}
          >
            Hello, {username}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <NotificationBell
            anchorEl={anchorEl}
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
          />
          <UserAvatar>{name}</UserAvatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
