import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import navbarItems from "./constants/navbarItems";
import BasicDialog from "./BasicDialog";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import MeyiLogo from  "../assets/logo.png"

const drawerWidth = 190;

const Navbar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState({ id: 0 });
  const logout = () => {
    apiService.logout();
    navigate("/login");
  };

  const isAdmin = localStorage.getItem("role") === "admin";
  const filterarr = !isAdmin
    ? navbarItems?.filter(
        (val) =>
          val.text !== "Users" &&
          val.text !== "Projects" &&
          val.text !== "Modules"
      )
    : navbarItems;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        display: "flex",
        flexDirection: "column",
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          padding: "1rem",
          textDecoration: "none",
          color: "black",
          background: "#ffffff",
        }}
        href="/dashboard"
      >
        <div style={{display:"flex", flexDirection:"row" ,alignItems:"center"}}>
        <img src={MeyiLogo} alt="logo" style={{height:"25px",width:"35px",}}/>
        <Typography  sx={{color:"#398EED", fontWeight:"bold", paddingLeft:"3px"}}>Bug Tracker</Typography>
        </div>
      </Box>
      <List sx={{ background: "#ffffff", height: "100%", color: "black" }}>
        {filterarr &&
          filterarr.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                sx={{ width: "239px", padding: "auto" }}
                selected={item.id === selectedItem.id}
                onClick={() => {
                  setSelectedItem(item);
                  navigate(item.link);
                }}
              >
                <ListItemIcon sx={{color:item.color}}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ marginLeft: "-25px",color:"#6e6e6e" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <BasicDialog
        action={logout}
        buttonMsg="Logout"
        sx={{ width: "100%"  }}
      >
        Are you sure you want to log out?
      </BasicDialog>
    </Drawer>
  );
};

export default Navbar;
