import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import WorkIcon from "@mui/icons-material/Work";
import PaletteIcon from "@mui/icons-material/Palette";
import { useNavigate } from "react-router-dom";

import Colors from "../colors";
import NavBar from "./NavBar";
import { SketchPicker } from "react-color";
import { Theme } from "../GlobalStyles";
function AppBarr({
  roled,
  darkMode,
  setDarkMode,
  setShowHRs
}) {
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem("themeColor") || "#7DB9B6"
  );
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const color = Colors(darkMode, themeColor);
  const [colorAnchor, setColorAnchor] = useState(null);

  const role = localStorage.getItem("role")?.toLowerCase();

  let title = "";

  if (role === "company") {
    title = "COMPANY DASHBOARD";
  } else if (role === "hr") {
    title = "HR PORTAL";
  } else if (role === "employee") {
    title = "EMPLOYEE PORTAL";
  } else {
    title = "PORTAL";
  }

  const userEmail = localStorage.getItem("email") || "";
  const firstLetter = userEmail.charAt(0).toUpperCase();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };


  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: color.navbar,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { md: 240 },
            }}
          >
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                display: { xs: "flex", md: "none" },
                color: color.text,
              }}
            >
              <MenuIcon />
            </IconButton>


            <WorkIcon
              sx={{
                color: color.text,
                display: { xs: "none", md: "block" },
                mr: 1,
              }}
            />
          </Box>

          {/* Center */}
          <Typography
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: color.text,
              mr: 2,
              letterSpacing: 1,
              ml: 2,
              fontSize: Theme.font24Bold,
              display: { xs: "none", md: "block" },
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: color.text,
              mr: 1,
              letterSpacing: 1,
              ml: 2,
              fontSize: Theme.font14Bold,
              display: { xs: "block", md: "none" },
            }}
          >
            {title}
          </Typography>


          {/* Right */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0
            }}
          >
            <IconButton
              onClick={(e) => setColorAnchor(e.currentTarget)}
              sx={{ color: color.text }}
            >
              <PaletteIcon />
            </IconButton>
            <Menu
              anchorEl={colorAnchor}
              open={Boolean(colorAnchor)}
              onClose={() => setColorAnchor(null)}
            >
              <Box sx={{ p: 2 }}>
                <SketchPicker
                  color={themeColor}
                  onChangeComplete={(updatedColor) => {
                    const selectedColor = updatedColor.hex;

                    setThemeColor(selectedColor);
                    localStorage.setItem("themeColor", selectedColor);


                    window.location.reload();
                  }}
                />
              </Box>
            </Menu>
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{ color: color.text }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <IconButton onClick={handleOpen}>
              <Avatar
                sx={{
                  bgcolor: color.headings,
                  color: color.text,
                  width: 40,
                  height: 40,
                  fontWeight: "bold",
                }}
              >
                {firstLetter}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    width: 300,
                    borderRadius: 2,
                  },
                },
              }}
            >
              <MenuItem
                disabled
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  whiteSpace: "normal",
                }}
              >
                <AccountCircleIcon sx={{ mt: 0.5 }} />

                <Typography
                  sx={{
                    fontSize: 15,
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    maxWidth: 250,
                    mt: 0.5
                  }}
                >
                  {userEmail}
                </Typography>

              </MenuItem>

              <Divider />

              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: "red",
                }}
              >
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>


      <NavBar
        darkMode={darkMode}
        open={open}
        setOpen={setOpen}
        setShowHRs={setShowHRs}
      />
    </>
  );
}

export default AppBarr;