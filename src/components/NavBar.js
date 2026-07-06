import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";

function NavBar({ darkMode }) {
  const [open, setOpen] = useState(false);
  const [roled, setRoled] = useState("");
  const location = useLocation();

  const color = Colors(darkMode);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRoled(storedRole);
  }, []);

  const linkStyles = {
    p: 2,
    display: "block",
    textDecoration: "none",
    color: color.text,
  };

  const drawerContent = (
    <Box sx={{ width: 240, backgroundColor: color.background, height: "100%" }}>

      {roled === "hr" && (
        <>
          <Link to="/hr" style={{ textDecoration: "none" }}>
            <Typography sx={{
              ...linkStyles,
              ...(location.pathname === "/hr" && {
                backgroundColor: color.headings,
                color: color.text,
                fontSize: Theme.font16SemiBold,
                mt: 1,
              }),
            }}>
              Employees
            </Typography>
          </Link>

          <Divider />

          <Link to="/leave" style={{ textDecoration: "none" }}>
            <Typography sx={{
              ...linkStyles,
              ...(location.pathname === "/leave" && {
                backgroundColor: color.headings,
                color: color.text,
              }),
            }}>
              Leaves
            </Typography>
          </Link>
        </>
      )}

      {roled === "employee" && (
        <>
          <Link to="/employee" style={{ textDecoration: "none" }}>
            <Typography sx={{
              ...linkStyles,
              ...(location.pathname === "/employee" && {
                backgroundColor: color.headings,
                color: color.text,
              }),
            }}>
              Home
            </Typography>
          </Link>

          <Divider />

          <Link to="/leave/status" style={{ textDecoration: "none" }}>
            <Typography sx={{
              ...linkStyles,
              ...(location.pathname === "/leave/status" && {
                backgroundColor: color.headings,
                color: color.text,
              }),
            }}>
              Leave Status
            </Typography>
          </Link>
        </>
      )}
    </Box>
  );

  return (
    <>
      
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          top: 90,
          right: 20,
          zIndex: 1300,
        }}
      >
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon sx={{ color: color.text }} />
        </IconButton>
      </Box>


      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
            backgroundColor: color.background,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: 240,
            top: "65px",
            height: "calc(100vh - 64px)",
            backgroundColor: color.background,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default NavBar;