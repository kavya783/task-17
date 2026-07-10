import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Avatar,
  Stack,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonButton from "./CommonButton";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../colors";
import { Theme } from "../GlobalStyles";

import { getEmployeeDataActionInitiate } from "../redux/actions/getEmployeeAction";
import { addLeaveDataActionInitiate } from "../redux/actions/addLeaveAction";

function LeaveForm({ darkMode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const color = Colors(darkMode);

  const { data: employees = [] } = useSelector(
    (state) => state.getemployeedata
  );

  const initialLeave = {
    employeename: "",
    email: "",
    leaveType: "",
    from_date: "",
    to_date: "",
    reason: "",
    profileImage: "",
    status: "pending",
  };

  const [leave, setLeave] = useState(initialLeave);
  const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    dispatch(getEmployeeDataActionInitiate());
  }, [dispatch]);

  useEffect(() => {
     console.log("Employees:", employees);
    if (employees.length > 0) {
      const user = employees.find(
        (emp) => emp.email === userEmail
      );

      if (user) {
        setLeave((prev) => ({
          ...prev,
          employeename: user.name,
          email: user.email,
          profileImage:
            user.profile_image_url || "",
        }));
      }
    }
    
  }, [employees, userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLeave((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
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

  if (
    leave.fromDate &&
    leave.toDate &&
    leave.fromDate > leave.toDate
  ) {
    newErrors.toDate = "To Date must be after From Date";
    valid = false;
  }

  if (!leave.reason.trim()) {
    newErrors.reason = "Reason is required";
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) {
    toast.error("Please fix validation errors");
    return;
  }

 try {

 setLoading(true);

 await dispatch(
   addLeaveDataActionInitiate({
      employeename: leave.employeename,
      email: leave.email,
      leaveType: leave.leaveType,
      from_date: leave.fromDate,
      to_date: leave.toDate,
      reason: leave.reason,
      status:"pending",
      profileImage: leave.profileImage,
   })
 );


 navigate("/employee");

}
catch(error){

 console.log(error);
 toast.error("Failed to submit leave");

}
finally{
 setLoading(false);
}
};

return (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
       backgroundColor: color.background,
    }}
  >
    <Card
      sx={{
        width: 340,
        borderRadius: 4,
        p: 2,
       
        color: color.text,
      }}
    >
      <CardContent>
        <Stack alignItems="center" spacing={1} mb={2}>
          <Avatar sx={{ width: 45, height: 45 }}>
            <WorkIcon fontSize="small" />
          </Avatar>

          <Typography
            sx={{
              fontSize: Theme.font20Bold,
              color: color.headings,
            }}
          >
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
            sx={{ mt: 2, mb: 2 }}
          />

          <TextField
            size="small"
            label="Email"
            value={leave.email}
            fullWidth
            disabled
            sx={{ mb: 2 }}
          />

          <TextField
            select
            label="Leave Type"
            name="leaveType"
            size="small"
            fullWidth
            value={leave.leaveType}
            onChange={handleChange}
            error={!!errors.leaveType}
            helperText={errors.leaveType}
            sx={{ mb: 2 }}
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
            multiline
            rows={3}
            fullWidth
            value={leave.reason}
            onChange={handleChange}
            error={!!errors.reason}
            helperText={errors.reason}
            sx={{ mt: 2 }}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <CommonButton
  variant="outlined"
  fullWidth
  onClick={() => navigate("/employee")}
  sx={{
    borderColor: color.headings,
    color: color.headings,
    "&:hover": {
      borderColor: color.border,
      backgroundColor: "transparent",
    },
  }}
>
  Back
</CommonButton>

<CommonButton
  type="submit"
  fullWidth
  disabled={loading}
  sx={{
    bgcolor: color.headings,
    color: color.text,
    "&:hover": {
      bgcolor: color.border,
    },
  }}
>
  {loading ? "Submitting..." : "Submit"}
</CommonButton>
          </Box>
        </form>
      </CardContent>
    </Card>
  </Box>
)
}
export default LeaveForm