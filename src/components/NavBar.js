import React, { useEffect, useState } from "react";
import {
  Box,

  Drawer,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  People,
  EventNote,
  Home,
  AssignmentTurnedIn,
  
} from "@mui/icons-material";

import { Link, useLocation } from "react-router-dom";

import Colors from "../colors";
import { Theme } from "../GlobalStyles";

function NavBar({ darkMode, open, setOpen }) {
  const [roled, setRoled] = useState("");

  const location = useLocation();

  const color = Colors(darkMode);

  useEffect(() => {
    setRoled(localStorage.getItem("role"));
  }, []);

  const menuStyle = (path) => ({
    borderRadius: "12px",
    mx: 1,
    my: 0.5,
    color: location.pathname === path ? color.background : color.text,
    backgroundColor:
      location.pathname === path
        ? color.headings
        : "transparent",
        borderRight:
    location.pathname === path
      ? `1px solid ${color.border}`
      : "1px solid transparent",

    "&:hover": {
      backgroundColor: color.headings,
      color:color.text,
      transform: "translateX(5px)",
      transition: "0.3s",
      
    },
  });

  const drawerContent = (
    <Box
      sx={{
        width: 240,
        height: "100%",
        bgcolor: color.background,
      }}
    >
      

      <Divider />

      <List>
        {roled === "hr" && (
          <>
            <ListItemButton
              component={Link}
              to="/hr"
              sx={menuStyle("/hr")}
            >
              <ListItemIcon>
                <People
                  sx={{
                    color:
                      location.pathname === "/hr"
                        ? "#fff"
                        : color.text,
                        fontSize:Theme.font24Bold,
                       
                  }}
                />
              </ListItemIcon>

              <ListItemText primary="Employees" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/leave"
              sx={menuStyle("/leave")}
            >
              <ListItemIcon>
                <EventNote
                  sx={{
                    color:
                      location.pathname === "/leave"
                        ? "#fff"
                        : color.text,
                  }}
                />
              </ListItemIcon>

              <ListItemText primary="Leaves" />
            </ListItemButton>
          </>
        )}

        {roled === "employee" && (
          <>
            <ListItemButton
              component={Link}
              to="/employee"
              sx={menuStyle("/employee")}
            >
              <ListItemIcon>
                <Home
                  sx={{
                    color:
                      location.pathname === "/employee"
                        ? "#fff"
                        : color.text,
                  }}
                />
              </ListItemIcon>

              <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/leave/status"
              sx={menuStyle("/leave/status")}
            >
              <ListItemIcon>
                <AssignmentTurnedIn
                  sx={{
                    color:
                      location.pathname === "/leave/status"
                        ? "#fff"
                        : color.text,
                  }}
                />
              </ListItemIcon>

              <ListItemText primary="Leave Status" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile */}

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: 240,
            bgcolor: color.background,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop */}

      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          "& .MuiDrawer-paper": {
            width: 240,
            top: "64px",
            height: "calc(100vh - 64px)",
            bgcolor: color.background,
            borderRight: "1px solid #ddd",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default NavBar;