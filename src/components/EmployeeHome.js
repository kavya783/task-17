import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,

  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getEmployeeDataActionInitiate } from "../redux/actions/getEmployeeAction";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";
import CommonButton from "./CommonButton";

function EmployeeHome({ darkMode }) {
  const themeColor =
  localStorage.getItem("themeColor") || "#7DB9B6";
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const color = Colors(darkMode, themeColor);
 
  const { data, loading, error } = useSelector(
    (state) => state.getemployeedata
  );
  

  const email = localStorage.getItem("email");

  useEffect(() => {
    dispatch(getEmployeeDataActionInitiate());
  }, [dispatch]);

  const employee = data.find((emp) => emp.email === email);

  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5, color: "red" }}>
        {error}
      </Typography>
    );
  }

  if (!employee) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        Employee not found
      </Typography>
    );
  }

  return (
      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    px: 1, 
    mt: 5,
  }}
>
  <Card
    sx={{
      width: {
        xs: "100%",   // Mobile
        sm: 350,     // Tablet
        md: 400,     // Desktop
      },
      maxWidth: 400,
      borderRadius: 7,
      boxShadow: "0px 10px 15px rgba(0,0,0,0.1)",
      p: {
        xs: 2,
        sm: 3,
      },
      transition: "0.3s",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    }}
  >
        <CardContent>
          <Avatar
            src={employee.profile_image_url}
            alt={employee.name}
            sx={{
              width: { xs: 60, sm: 90 },
              height: { xs: 60, sm: 90 },
              margin: "0 auto",
              mb: 1,
            }}
          />

          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              ...Theme.font24Bold,
              mb: 1,
              color: color.card
            }}
          >
            {employee.name}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ color: color.card }} />
              <Typography sx={{ color: color.card, fontSize: Theme.font16SemiBold }}>
                {employee.email}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WorkIcon sx={{ color: color.card }} />
              <Typography sx={{ color: color.card, fontSize: Theme.font16SemiBold }}>
                {employee.role}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CurrencyRupeeIcon sx={{ color: color.card }} />
              <Typography sx={{ color: color.card, fontSize: Theme.font16SemiBold }}>
                {employee.salary}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <CommonButton
            fullWidth
            onClick={() => navigate("/leave/form")}
            sx={{
              borderRadius: "30px",
              ...Theme.font16Bold,
              bgcolor: color.navbar,


              "&:hover": {
                bgcolor: color.border,
              },
              color: color.card,
            }}
          >
            Apply Leave
          </CommonButton>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EmployeeHome;