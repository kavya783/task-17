import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";

function EmployeeHome() {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeDetails();
  }, []);

 const getEmployeeDetails = async () => {
  try {
    const email = localStorage.getItem("email");

    const res = await axios.get("http://localhost:3000/api/users");

    console.log(res.data);
    console.log(email);

    const user = res.data.find((emp) => emp.email === email);

    console.log(user);

    setEmployee(user);
  } catch (err) {
    console.log(err);
  }
};
const email = localStorage.getItem("email");

console.log("Stored Email:", email);


  return (
    <Box
      sx={{
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        mt: 5,
           }}
    >
      {employee && (
        <Card
          sx={{
            width: {
              xs: "100%",
              sm: 300,
              md: 300,
            },
            borderRadius: 10,
            
            boxShadow: "0px 10px 15px rgba(0,0,0,0.1)",
            p: { xs: 2, sm: 3 },
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <CardContent>

            <Avatar
  src={employee.profile_image_url}
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
                fontSize:Theme.font24Bold,
                mb: 1,
               
              }}
            >
              {employee.name}
            </Typography>

            <Divider sx={{ mb: 1 }} />


            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon sx={{color:Colors.navbar}} />
                <Typography fontSize={{ xs: 14, sm: 16 }} sx={{color:Colors.black}}>
                  {employee.email}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WorkIcon sx={{color:Colors.navbar}} />
                <Typography fontSize={{ xs: 14, sm: 16 }} sx={{color:Colors.black}}>
                  {employee.role}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CurrencyRupeeIcon sx={{ color:Colors.navbar }} />
                <Typography fontSize={{ xs: 14, sm: 16}} sx={{color:Colors.black}}>
                  {employee.salary}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <Button
              fullWidth
              variant="contained"
              sx={{
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: { xs: 14, sm: 16 },
                py: { xs: 1, sm: 1.5 },
                background:
                  Colors.headings,
                  color:Colors.black,
              }}
              onClick={() => navigate("/leave/form")}
            >
              Apply Leave
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default EmployeeHome;