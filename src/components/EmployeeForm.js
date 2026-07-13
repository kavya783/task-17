import React, { useState } from "react";
import {
 
  TextField,
  MenuItem,
  Box,
  IconButton,
  Typography,
  
   Modal,
  Paper
} from "@mui/material";
import  {  useEffect } from "react";
// import Colors from "../colors";
import CommonButton from "./CommonButton";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Colors from "../colors";
import CloseIcon from "@mui/icons-material/Close";
import { Theme } from "../GlobalStyles";

export default function EmployeeForm({
  darkMode,
  employee,
  handleChange,
  submitHandle,
  show,
  handleClose,
   themeColor,
  type,
}) {
  const [errors, setErrors] = useState({});
  
  const employeeName = employee.employeename || employee.name || "";
  const employeeEmail = employee.email || "";
  const employeeRole = employee.role || "";
  const employeeSalary = employee.salary || "";
  const employeeAddress = employee.address || "";
  const employeePassword = employee.password || "";
 const color = Colors(darkMode, themeColor);
  const handleInputChange = (e) => {
    const { name } = e.target;

    handleChange(e);

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
const themeColor =
  localStorage.getItem("themeColor") || "#7DB9B6";
  const validate = () => {
    let newErrors = {};

    if (!employeeName) newErrors.employeename = "Name is required";
    if (!employeeRole) newErrors.role = "Role is required";
    if (!employeeSalary) newErrors.salary = "Salary is required";
    if (!employeeAddress) newErrors.address = "Address is required";
    if (!employeeEmail) newErrors.email = "Email is required";
    if (type === "add" && !employee.password) newErrors.password = "Password is required";
    if (type === "add" && !employee.profileImageFile)
      newErrors.profileImage = "Image is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  const formData = new FormData();

  formData.append("name", employeeName);
  formData.append("email", employeeEmail);
  formData.append("role", employeeRole);
  formData.append("salary", employeeSalary);
  formData.append("address", employeeAddress);

 if (employeePassword) {
  formData.append("password", employeePassword);
}

  if (employee.profileImageFile) {
    formData.append("profile_image", employee.profileImageFile);
  }

  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  submitHandle({
    formData,
    id: employee.id,
  });

};  

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    toast.error("Only JPG and PNG images are allowed");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    toast.error("Image must be less than 2MB");
    return;
  }

  handleChange({
    target: {
      name: "profileImageFile",
      value: file,
    },
  });

  setErrors((prev) => ({
    ...prev,
    profileImage: "",
  }));
};
useEffect(() => {
  if (show) {
    setErrors({});
  }
}, [show]);

 return (
 <Modal
  open={show}
  onClose={handleClose}
>
  <Paper
  elevation={10}
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "70%",
      sm: "50%",
      md: "30%",   
    },
    maxHeight: "90vh",
    overflowY: "auto",
    borderRadius: 4,
    p: 4,
  }}
>
 

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography
       sx={{fontSize:Theme.font20Bold}}
      >
        {type === "add"
          ? "Add Employee"
          : type === "edit"
          ? "Edit Employee"
          : "Employee Details"}
      </Typography>

      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Box>

    <Box
     
    >
   

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Avatar
            src={
              employee.profileImageFile
                ? URL.createObjectURL(
                    employee.profileImageFile
                  )
                : employee.profile_image_url ||
                  employee.profileImage
            }
            sx={{
              width: 130,
              height: 130,
              border: "4px solid #1976d2",
              boxShadow: 4,
              fontSize: 35,
            }}
          >
            {employeeName?.charAt(0).toUpperCase()}
          </Avatar>

          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: 5,
              right: 5,
              bgcolor: color.headings,
              color: color.text,
              "&:hover": {
                bgcolor:  color.headings,
              },
            }}
          >
            <EditIcon />

            <input
              hidden
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleImageChange}
            />
          </IconButton>
        </Box>
      </Box>

      {errors.profileImage && (
        <Typography
          color="error"
          align="center"
          mb={2}
        >
          {errors.profileImage}
        </Typography>
      )}


     <form onSubmit={handleSubmit}>


  <Box
    sx={{
      display: "flex",
      gap: 2,
      flexDirection: { xs: "column", md: "row" },
      mb: 2,
      mt:2
    }}
  >
    <TextField
      label="Employee Name"
      name="employeename"
      value={employeeName}
      onChange={handleInputChange}
      error={!!errors.employeename}
      helperText={errors.employeename}
      fullWidth
    />

    <TextField
      label="Email"
      name="email"
      value={employeeEmail}
      onChange={handleInputChange}
      error={!!errors.email}
      helperText={errors.email}
      fullWidth
    />
  </Box>

 
  <Box
    sx={{
      display: "flex",
      gap: 2,
      flexDirection: { xs: "column", md: "row" },
      mb: 2,
    }}
  >
    <TextField
      select
      label="Role"
      name="role"
      value={employeeRole}
      onChange={handleInputChange}
      error={!!errors.role}
      helperText={errors.role}
      fullWidth
    >
      <MenuItem value="hr">HR</MenuItem>
      <MenuItem value="employee">Employee</MenuItem>
    </TextField>

    <TextField
      label="Salary"
      name="salary"
      value={employeeSalary}
      onChange={handleInputChange}
      error={!!errors.salary}
      helperText={errors.salary}
      fullWidth
    />
  </Box>
 <Box
    sx={{
      display: "flex",
      gap: 2,
      flexDirection: { xs: "column", md: "row" },
      mb: 2,
    }}
  >
  {/* Address */}
  <TextField
    label="Address"
    name="address"
    multiline
   
    value={employeeAddress}
    onChange={handleInputChange}
    error={!!errors.address}
    helperText={errors.address}
    fullWidth
    sx={{ mb: 2 }}
  />

  {/* Password */}
  <TextField
    label="Password"
    type="password"
    name="password"
    value={employeePassword}
    onChange={handleInputChange}
    error={!!errors.password}
    helperText={
      type === "edit"
        ? "Leave blank to keep current password"
        : errors.password
    }
    fullWidth
    sx={{ mb: 3 }}
  />
</Box>
  {/* Buttons */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      gap: 2,
    }}
  >
    <CommonButton onClick={handleClose} sx={{color:color.text,bgcolor:color.headings}}>
      Cancel
    </CommonButton>

    {type !== "view" && (
      <CommonButton type="submit" sx={{bgcolor:color.navbar}}>
        {type === "add"
          ? "Add Employee"
          : "Update Employee"}
      </CommonButton>
    )}
  </Box>

</form>
      {/* Buttons */}

      
     
    </Box>
  </Paper>
</Modal>
);
}