import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import UserAvatar from "./UserAvatar";
import apiService from "../services/apiService";
import { useNavigate } from "react-router-dom";
import BasicDialog from "./BasicDialog";

const Header = ({ drawerWidth, tmpbar = false, username }) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const logout = () => {
    apiService.logout();
    navigate("/login");
  };
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
        backgroundColor: "#D0E8F2",
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
            justifyContent: "flex-end",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {" "}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "black" }}
          >
            Welcome {username}
          </Typography>
          <UserAvatar>{name}</UserAvatar>
          <Typography>
          <BasicDialog
            action={logout}
            buttonMsg="Logout"
            sx={{
              backgroundColor: "#F6F6F6",
              color: "black",
              fontSize: "14px",
              padding: "8px 16px",
            }}
          >
            Are you sure you want to log out?
          </BasicDialog>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
