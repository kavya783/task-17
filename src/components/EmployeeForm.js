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
  type,
}) {
  const [errors, setErrors] = useState({});
  
  const employeeName = employee.employeename || employee.name || "";
  const employeeEmail = employee.email || "";
  const employeeRole = employee.role || "";
  const employeeSalary = employee.salary || "";
  const employeeAddress = employee.address || "";
  const employeePassword = employee.password || "";
 const color = Colors(darkMode);
  const handleInputChange = (e) => {
    const { name } = e.target;

    handleChange(e);

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
  let newErrors = {};

  // Employee Name
  if (!employeeName.trim()) {
    newErrors.employeename = "Name is required";
  }

  // Email
  if (!employeeEmail.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employeeEmail)
  ) {
    newErrors.email = "Enter a valid email";
  }

  // Role
  if (!employeeRole) {
    newErrors.role = "Role is required";
  }

  // Salary
  if (!employeeSalary) {
    newErrors.salary = "Salary is required";
  } else if (!/^\d+$/.test(employeeSalary)) {
    newErrors.salary = "Salary must contain only numbers";
  }

  // Address
  if (!employeeAddress.trim()) {
    newErrors.address = "Address is required";
  }

  // Password
  if (type === "add") {
    if (!employeePassword) {
      newErrors.password = "Password is required";
    } else if (employeePassword.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }
  }

  if (
    type === "edit" &&
    employeePassword &&
    employeePassword.length < 6
  ) {
    newErrors.password =
      "Password must be at least 6 characters";
  }

  // Profile 
  if (type === "add" && !employee.profileImageFile) {
    newErrors.profileImage = "Image is required";
  }

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

  // for (let pair of formData.entries()) {
  //   // console.log(pair[0], pair[1]);
  // }

  submitHandle({
    formData,
    id: employee.id,
  });

};  

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    toast.error("Only JPG and PNG images are allowed");
    return;
  }

  const maxSize = 1 * 1024 * 1024; // 1 MB

  if (file.size <= maxSize) {
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

    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const maxWidth = 1200;
      const maxHeight = 1200;

      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        } else {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            toast.error("Image compression failed");
            return;
          }

          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, ".jpg"),
            {
              type: "image/jpeg",
              lastModified: Date.now(),
            }
          );

          if (compressedFile.size > maxSize) {
            toast.error("Image is still larger than 1 MB");
            return;
          }

          handleChange({
            target: {
              name: "profileImageFile",
              value: compressedFile,
            },
          });

          setErrors((prev) => ({
            ...prev,
            profileImage: "",
          }));

          console.log(
            "Original size:",
            (file.size / 1024 / 1024).toFixed(2),
            "MB"
          );

          console.log(
            "Compressed size:",
            (compressedFile.size / 1024 / 1024).toFixed(2),
            "MB"
          );
        },
        "image/jpeg",
        0.7
      );
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
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
      <CommonButton type="submit" sx={{bgcolor:color.navbar,color:color.text}}>
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