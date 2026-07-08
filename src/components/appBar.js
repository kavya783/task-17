import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";

import Colors from "../colors";

import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NavBar from "./NavBar";

function AppBarr({ roled, darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const color = Colors(darkMode);

  const role = roled?.toLowerCase();

  let title = "";
  if (role === "hr") title = "HR PORTAL";
  else if (role === "employee") title = "EMPLOYEE PORTAL";
  else return null;

  const userEmail = localStorage.getItem("email");
  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
     <AppBar
  position="fixed"
  sx={{
    backgroundColor: color.navbar,
    boxShadow: "none",
  }}
>
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    {/* Left Side */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: { xs: "20%", md: "240px" },
      }}
    >
      <IconButton
        onClick={() => setOpen(true)}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <MenuIcon sx={{ color: color.text }} />
      </IconButton>
    </Box>

    {/* Center */}
    <Typography
      sx={{
        flexGrow: 1,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: {
          xs: "18px",
          sm: "20px",
          md: "24px",
        },
        color: color.text,
      }}
    >
      {title}
    </Typography>

    {/* Right Side */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <IconButton onClick={toggleDarkMode}>
        {darkMode ? (
          <LightModeIcon sx={{ color: color.text }} />
        ) : (
          <DarkModeIcon sx={{ color: color.text }} />
        )}
      </IconButton>

      <IconButton onClick={handleOpen}>
        <Avatar
          sx={{
            bgcolor: color.headings,
            color: color.text,
            width: 36,
            height: 36,
          }}
        >
          {firstLetter}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>{userEmail}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  </Toolbar>
</AppBar>

<NavBar
  darkMode={darkMode}
  open={open}
  setOpen={setOpen}
/>

<NavBar
  darkMode={darkMode}
  open={open}
  setOpen={setOpen}
/>

   
     <NavBar darkMode={darkMode} setDarkMode={setDarkMode}
      open={open}
  setOpen={setOpen} />
    
    </>
  );
};
export default AppBarr;