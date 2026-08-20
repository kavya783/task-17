import React, {
  useEffect,
  useState,
  useMemo,
  lazy,
  Suspense,
  useCallback,
} from "react";

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
  Badge,
  Popover,
  TextField,
} from "@mui/material";

import API from "../API/API";

import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import WorkIcon from "@mui/icons-material/Work";
import PaletteIcon from "@mui/icons-material/Palette";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  listenForForegroundNotifications,
} from "../notification";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getNotificationDataActionInitiate,
} from "../redux/actions/getNotificationAction";

import Colors from "../colors";
import NavBar from "./NavBar";

import { Theme } from "../GlobalStyles";
import { toast } from "react-toastify";

const SketchPicker = lazy(() =>
  import("react-color").then((module) => ({
    default: module.SketchPicker,
  }))
);

function AppBarr({
  roled,
  darkMode,
  setDarkMode,
  setShowHRs,
  setSearch: setParentSearch
}) {
  const dispatch = useDispatch();
  const api = useMemo(() => new API(), []);

  const { notifications = [] } = useSelector(
    (state) => state.getnotificationdata
  );

 const role = localStorage.getItem("role")?.toLowerCase();

const leaveNotifications = useMemo(() => {
  return notifications.filter(
    (item) =>
      item?.notification_type?.toLowerCase() === "leave"
  );
}, [notifications]);
const unreadNotifications = useMemo(
  () => leaveNotifications.filter((item) => !item.read),
  [leaveNotifications]
);

  const [themeColor, setThemeColor] = useState(
    localStorage.getItem("themeColor") || "#7DB9B6"
  );
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const color = useMemo(
  () => Colors(darkMode, themeColor),
  [darkMode, themeColor]
);
  const [colorAnchor, setColorAnchor] = useState(null);


  const [notificationAnchor, setNotificationAnchor] = useState(null);


const titleMap = {
  company: "COMPANY DASHBOARD",
  hr: "HR PORTAL",
  employee: "EMPLOYEE PORTAL",
};

const title = titleMap[role] || "PORTAL";

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
  const handleResize = useCallback(() => {
    // console.log("Window width:", window.innerWidth);
  }, []);

  useEffect(() => {
    let lastRun = 0;

    const throttledResize = () => {
      const now = Date.now();

      if (now - lastRun >= 300) {
        handleResize();
        lastRun = now;
      }
    };

    window.addEventListener("resize", throttledResize);

    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, [handleResize]);
  useEffect(() => {
    if (role === "company") return;

    dispatch(getNotificationDataActionInitiate());

    const interval = setInterval(() => {
      dispatch(getNotificationDataActionInitiate());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, role]);

  useEffect(() => {
    const timer = setTimeout(() => {
      api.get("notifications/welcome")
        .then((response) => {
          if (response.data) {
            toast.success(response.data.message);

            api.put(
              `notifications/${response.data.id}/mark_as_read`,
              null,
              false
            );
          }
        })
        .catch(console.log);
    }, 30000);

    return () => clearTimeout(timer);
  }, [api]);
  useEffect(() => {
  let unsubscribe = null;

  const setupFCMListener = async () => {

    unsubscribe =
      await listenForForegroundNotifications(
        ({ title, message }) => {

          console.log(
            " APPBAR RECEIVED FCM:",
            title,
            message
          );

          toast.success(
            `${title}: ${message}`
          );

          // Immediately refresh notification list
          dispatch(
            getNotificationDataActionInitiate()
          );
        }
      );
  };

  setupFCMListener();

  return () => {

    if (unsubscribe) {
      unsubscribe();
    }

  };

}, [dispatch]);
  // console.log("Notification State:", notifications);

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
              aria-label="Open navigation menu"
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
           
            {role !== "company" && (
              <>
                <IconButton
                  aria-label={`Notifications, ${unreadNotifications.length} unread`}
                  onClick={(e) => setNotificationAnchor(e.currentTarget)}
                  sx={{ color: color.text }}
                >
                  <Badge
                    badgeContent={unreadNotifications.length}
                    color="error"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <Popover
                  open={Boolean(notificationAnchor)}
                  anchorEl={notificationAnchor}
                  onClose={() => setNotificationAnchor(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Box sx={{ width: 300, p: 2 }}>
                    {leaveNotifications.length === 0 ? (
                      <Typography>No Notifications</Typography>
                    ) : (
                      leaveNotifications.map((item) => (
                        <Box
                          key={item.id}
                          onClick={async () => {

                            if (!item.read) {

                              await api.put(
                                `notifications/${item.id}/mark_as_read`
                              );


                              dispatch(
                                getNotificationDataActionInitiate()
                              );

                            }

                          }}
                          sx={{
                            p: 2,
                            mb: 1.5,
                            cursor: "pointer",

                            border: item.read
                              ? `1px solid ${color.white}`
                              : `2px solid ${color.red}`,

                            borderRadius: "10px",

                            boxShadow: item.read
                              ? "none"
                              : `0 0 5px ${color.red}`,

                            "&:hover": {
                              background: color.white,
                            },
                          }}
                        >

                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: color.card,
                            }}
                          >
                            {item.title}
                          </Typography>


                          <Typography
                            variant="body2"
                            sx={{
                              mt: 0.5,
                              color: color.card,
                            }}
                          >
                            {item.message}
                          </Typography>


                          <IconButton
                            aria-label={`Delete notification from ${item.title}`}
                            onClick={async (e) => {
                              e.stopPropagation();

                              await api.delete(`notifications/${item.id}`);

                              dispatch(getNotificationDataActionInitiate());
                            }}
                            sx={{
                              ml: 30,
                              color: color.red,
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>

                        </Box>
                      ))
                    )}
                  </Box>
                </Popover>
              </>
            )}
            <IconButton
              aria-label="Change theme color"
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
                <Suspense fallback={<Box sx={{ p: 2,mr:20 }}>Loading...</Box>}>
                  <SketchPicker
                    color={themeColor}
                    onChangeComplete={(updatedColor) => {
                      const selectedColor = updatedColor.hex;

                      setThemeColor(selectedColor);
                      localStorage.setItem("themeColor", selectedColor);

                      window.location.reload();
                    }}
                  />
                </Suspense>
              </Box>
            </Menu>
            <IconButton
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setDarkMode(!darkMode)}
              sx={{ color: color.text }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <IconButton
              aria-label="Open profile menu"
              onClick={handleOpen}
            >
              <Avatar
                alt="User profile"
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