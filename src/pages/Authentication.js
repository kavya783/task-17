import React, { useState } from "react";
import { TextField, Typography, Button, Card, CardContent, Box } from "@mui/material";
import AppBarr from "../components/appBar";
import { useNavigate } from "react-router-dom";



import axios from "axios";
import { toast } from "react-toastify";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";


export default function AuthenticationForm({ darkMode }) {
  const navigate = useNavigate();
   const color = Colors(darkMode); 

  const [employee, setEmployee] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };


  const validate = () => {
    let valid = true;

    let tempErrors = {
      email: false,
      password: false,
    };

    if (!employee.email.trim()) {
      tempErrors.email = true;
      valid = false;
    }

    if (!employee.password.trim()) {
      tempErrors.password = true;
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };




const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const res = await axios.post("https://task-17-b.onrender.com/api/login", {
      email: employee.email,
      password: employee.password,
    });

    console.log("Response:", res.data);

   
    const email = res.data.user.email;
    const role = res.data.user.role;

    console.log("Email:", email);
    console.log("Role:", role);

    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    console.log("Stored Email:", localStorage.getItem("email"));
    console.log("Stored Role:", localStorage.getItem("role"));

    toast.success("Login Success");

    if (role === "hr") {
      navigate("/hr");
    } else {
      navigate("/employee");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Login failed");
  }
};
  return (
    <Box
      sx={{
        height: 648,
        background:color.headings,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: 10,
      }}
    >
      <AppBarr />

      <Card sx={{ width: { xs: 200, sm: 300 }, p: 3, borderRadius: 5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)", }}>
        <CardContent>
          <Typography sx={{ textAlign: "center", mb: 2, color: Colors.black, fontSize: Theme.font20Bold }}>
            Login Form
          </Typography>

          <form onSubmit={handleSubmit}>

            <TextField
              label="Email"
              name="email"
              fullWidth
              value={employee.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email ? "Email required" : " "}
              sx={{ mb: 3 }}
            />


            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={employee.password}
              onChange={handleChange}
              error={errors.password}
              helperText={errors.password ? "Password required" : " "}
              sx={{ mb: 3 }}
            />


            <Button
              type="submit"
              variant="contained"
              sx={{ ml: { xs: 5, sm: 10 }, width: 100, color: Colors.black, fontSize: Theme.font14Bold, background: Colors.navbar }}
            // fullWidth
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}