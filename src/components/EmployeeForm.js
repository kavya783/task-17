import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";

import Colors from "../colors";
import CommonButton from "./CommonButton";
import { toast } from "react-toastify";

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
  const color = Colors(darkMode);
  const employeeName = employee.employeename || employee.name || "";
  const employeeEmail = employee.email || "";
  const employeeRole = employee.role || "";
  const employeeSalary = employee.salary || "";
  const employeeAddress = employee.address || "";
  const employeePassword = employee.password || "";

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

    submitHandle({ formData, id: employee.id });
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

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {type === "add"
          ? "Add Employee"
          : type === "edit"
          ? "Edit Employee"
          : "View Employee"}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Employee Name"
            name="employeename"
            value={employeeName}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.employeename}
            helperText={errors.employeename}
          />

          <TextField
            label="Role"
            select
            name="role"
            value={employeeRole}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.role}
            helperText={errors.role}
          >
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </TextField>

          <TextField
            label="Salary"
            name="salary"
            value={employeeSalary}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.salary}
            helperText={errors.salary}
          />

          <TextField
            label="Address"
            name="address"
            value={employeeAddress}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.address}
            helperText={errors.address}
          />

          <TextField
            label="Email"
            name="email"
            value={employeeEmail}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={employeePassword}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.password}
            helperText={errors.password}
          />

          {/* IMAGE UPLOAD */}
          <Box sx={{ mt: 2 }}>
            <CommonButton component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
            </CommonButton>
          </Box>

          {errors.profileImage && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.profileImage}
            </p>
          )}

          {/* PREVIEW */}
          {(employee.profileImageFile || employee.profile_image_url || employee.profileImage) && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <img
                src={
                  employee.profileImageFile
                    ? URL.createObjectURL(employee.profileImageFile)
                    : employee.profile_image_url || employee.profileImage
                }
                alt="preview"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                }}
              />
            </Box>
          )}

          <DialogActions>
            <CommonButton onClick={handleClose}>Cancel</CommonButton>

            {type !== "view" && (
              <CommonButton type="submit">
                {type === "add" ? "Add Employee" : "Update Employee"}
              </CommonButton>
            )}
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}