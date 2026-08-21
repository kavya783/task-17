import {
  Box,
  
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
import { getHRDataActionInitiate } from "../redux/actions/getHRAction";
import { addLeaveDataActionInitiate } from "../redux/actions/addLeaveAction";

function LeaveForm({ darkMode }) {
  const themeColor =
  localStorage.getItem("themeColor") || "#7DB9B6";
  const navigate = useNavigate();
  const dispatch = useDispatch();
const role = localStorage.getItem("role");

 const color = Colors(darkMode, themeColor);

  const { data: employees = [] } = useSelector(
  (state) => state.getemployeedata || {}
);

const {
  hrs = [],
  data: hrData = [],
} = useSelector(
  (state) => state.gethrdata || {}
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
  if (role === "hr") {
    dispatch(getHRDataActionInitiate());
  } else {
    dispatch(getEmployeeDataActionInitiate());
  }
}, [dispatch, role]);

useEffect(() => {

  const list =
    role === "hr"
      ? (hrs.length ? hrs : hrData)
      : employees;

  const user = list.find(
    (item) => item.email === userEmail
  );

  if(user){

    setLeave(prev => {

      if(
        prev.employeename === user.name &&
        prev.email === user.email &&
        prev.profileImage === (user.profile_image_url || "")
      ){
        return prev;
      }

      return {
        ...prev,
        employeename:user.name,
        email:user.email,
        profileImage:user.profile_image_url || ""
      };

    });

  }

}, [employees, hrs, hrData, role, userEmail]);
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

  if (!leave.from_date) {
    newErrors.fromDate = "Select from date";
    valid = false;
  }

  if (!leave.to_date) {
    newErrors.toDate = "Select to date";
    valid = false;
  }

  if (
    leave.from_date &&
    leave.to_date &&
    leave.from_date > leave.to_date
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
        from_date: leave.from_date,
        to_date: leave.to_date,
        reason: leave.reason,
        status: "pending",
        profileImage: leave.profileImage,
        applied_by: role,
      })
    );

   
// console.log("role:", role);
// console.log("navigating...");
    navigate(role === "hr" ? "/hr" : "/employee");
  } catch (error) {
    toast.error("Failed to submit leave");
  } finally {
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
              name="from_date"
              fullWidth
              value={leave.from_date}
              onChange={handleChange}
              error={!!errors.fromDate}
              helperText={errors.fromDate}
            />

            <TextField
              type="date"
              name="to_date"
              fullWidth
              value={leave.to_date}
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
onClick={() =>
  navigate(role === "hr" ? "/hr" : "/employee")
}
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