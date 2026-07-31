import React, { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import AppBarr from "../components/appBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../colors";
import { Theme } from "../GlobalStyles";

import { loginActionInitiate } from "../redux/actions/loginAction";
import { requestNotificationPermission } from "../notification";

export default function AuthenticationForm({ darkMode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const color = Colors(darkMode);

  const { loading } = useSelector((state) => state.login);

  const [employee, setEmployee] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const validate = () => {
    let valid = true;

    let temp = {
      email: false,
      password: false,
    };

    if (!employee.email.trim()) {
      temp.email = true;
      valid = false;
    }

    if (!employee.password.trim()) {
      temp.password = true;
      valid = false;
    }

    setErrors(temp);

    return valid;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const res = await dispatch(loginActionInitiate(employee));

    console.log("LOGIN RESPONSE:", res);

    localStorage.setItem("token", res.token);

    // Company Login
   if (res.type === "company") {

  localStorage.setItem("type", "company");
  localStorage.setItem("role", "company");
  localStorage.setItem("email", res.company.email);
  localStorage.setItem("company_id", res.company.id);

  navigate("/company-dashboard", {
    replace: true,
  });

  return;
}


    // User Login (HR / Employee)

    const email = res.user.email;
    const role = res.role;
    const userId = res.user.id;

   localStorage.setItem("type", "user");
localStorage.setItem("email", email);
localStorage.setItem("role", role);
localStorage.setItem("user_id", String(userId));


// verify
console.log(
  "USER ID FROM STORAGE:",
  localStorage.getItem("user_id")
);


await requestNotificationPermission(dispatch, userId);


    if (role === "hr") {
      navigate("/hr", { replace: true });
    } else {
      navigate("/employee", { replace: true });
    }


  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.error || "Login Failed"
    );

  }
};

  return (
    <>
      {/* <AppBarr /> */}

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: color.headings,
          p: 2
        }}
      >
        <Card
          sx={{
            width: {
              xs: "100%",
              sm: 380,
            },
            borderRadius: 4,
            boxShadow: "0px 12px 35px rgba(0,0,0,0.3)",
            p: 2,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: color.navbar,
                  width: 70,
                  height: 70,
                }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>
            </Box>

            <Typography
              align="center"
              sx={{
                fontSize: Theme.font24Bold,
                fontWeight: "bold",
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              align="center"
              sx={{
                mb: 3,
                color: "gray",
              }}
            >
              Login to continue
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                value={employee.email}
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email ? "Email is required" : ""}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />

              <TextField
                label="Password"
                name="password"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={employee.password}
                onChange={handleChange}
                error={errors.password}
                helperText={errors.password ? "Password is required" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
                // slotProps={{
                //   input: {
                //     endAdornment: (
                //       <InputAdornment position="end">
                //         <IconButton onClick={() => setShowPassword(!showPassword)}>
                //           {showPassword ? <VisibilityOff /> : <Visibility />}
                //         </IconButton>
                //       </InputAdornment>
                //     ),
                //   },
                // }}
              />

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: "bold",
                  fontSize: 16,
                  textTransform: "none",
                  backgroundColor: color.navbar,
                  "&:hover": {
                    backgroundColor: "#0d47a1",
                  },
                }}
              >
                {loading ? "Logging In..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}