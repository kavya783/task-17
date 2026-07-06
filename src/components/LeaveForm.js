import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Avatar,
  Stack
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Colors from "../colors";
import { Theme } from "../GlobalStyles";
import axios from "axios";

function LeaveForm({ darkMode }) {
  const navigate = useNavigate();
  const color = Colors(darkMode);

  const initialLeave = {
    employeename: "",
    email: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    profileImage: "",
    status: "pending"
  };

  const [leave, setLeave] = useState(initialLeave);
  const [errors, setErrors] = useState({});

  // FETCH EMPLOYEE DATA (no redux)
  useEffect(() => {
    const email = localStorage.getItem("email");

    const fetchEmployee = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users");
const data = await res.json();

const user = data.find((emp) => emp.email === email);

if (user) {
  setLeave((prev) => ({
    ...prev,
    employeename: user.name,
    email: user.email,
    profileImage: user.profile_image_url
  }));
}
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLeave((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const validate = () => {
    let newErrors = {};
    let valid = true;

    if (!leave.leaveType) {
      newErrors.leaveType = "Select leave type";
      valid = false;
    }

    if (!leave.fromDate) {
      newErrors.fromDate = "Select from date";
      valid = false;
    }

    if (!leave.toDate) {
      newErrors.toDate = "Select to date";
      valid = false;
    }

    if (leave.fromDate && leave.toDate && leave.fromDate > leave.toDate) {
      newErrors.toDate = "To date must be after From date";
      valid = false;
    }

    if (!leave.reason.trim()) {
      newErrors.reason = "Reason is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
console.log("LEAVE DATA:", leave);
  // SUBMIT (no redux → direct API)
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("SEND DATA:", leave);

  // 🔥 ADD THIS
  if (!validate()) {
    toast.error("Please fix validation errors");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/api/leaves",
      {
        leave: {
          employeename: leave.employeename,
          email: leave.email,
          leaveType: leave.leaveType,
         from_date: leave.from_date,
          to_date: leave.to_Date,
          reason: leave.reason,
          status: "pending",
          profileImage: leave.profileImage
        }
      }
    );

    console.log("SUCCESS:", response.data);
    toast.success("Leave submitted successfully");

    navigate("/employee");

  } catch (err) {
    console.log("ERROR STATUS:", err.response?.status);
    console.log("ERROR DATA:", err.response?.data);

    toast.error("Failed submit leave");
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Card
        sx={{
          width: 340,
          borderRadius: 4,
          p: 2,
          backgroundColor: color.background,
          color: color.text
        }}
      >
        <CardContent>
          <Stack alignItems="center" spacing={1} mb={2}>
            <Avatar sx={{ width: 45, height: 45 }}>
              <WorkIcon fontSize="small" />
            </Avatar>

            <Typography sx={{ fontSize: Theme.font20Bold, color: color.headings }}>
              Apply Leave
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit}>
            <TextField
              size="small"
              label="Name"
              value={leave.employeename}
              fullWidth
              disabled
              sx={{ mb: 1, mt: 3 }}
            />

            <TextField
              size="small"
              label="Email"
              value={leave.email}
              fullWidth
              disabled
              sx={{ mb: 1, mt: 1 }}
            />

            <TextField
              select
              size="small"
              label="Leave Type"
              name="leaveType"
              fullWidth
              value={leave.leaveType}
              onChange={handleChange}
              error={!!errors.leaveType}
              helperText={errors.leaveType}
              sx={{ mt: 2, mb: 2 }}
            >
              <MenuItem value="Casual">Casual</MenuItem>
              <MenuItem value="Sick">Sick</MenuItem>
              <MenuItem value="Emergency">Emergency</MenuItem>
            </TextField>

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                type="date"
                name="fromDate"
                fullWidth
                value={leave.fromDate}
                onChange={handleChange}
                error={!!errors.fromDate}
                helperText={errors.fromDate}
              />

              <TextField
                type="date"
                name="toDate"
                fullWidth
                value={leave.toDate}
                onChange={handleChange}
                error={!!errors.toDate}
                helperText={errors.toDate}
              />
            </Box>

            <TextField
              name="reason"
              label="Reason"
              fullWidth
              multiline
              rows={2}
              value={leave.reason}
              onChange={handleChange}
              error={!!errors.reason}
              helperText={errors.reason}
              sx={{ mt: 2 }}
            />

            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                onClick={() => navigate("/employee")}
              >
                Back
              </Button>

              <Button type="submit" fullWidth variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LeaveForm;