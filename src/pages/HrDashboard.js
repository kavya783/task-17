import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
} from "@mui/material";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import AppBarr from "../components/appBar";
import CommonButton from "../components/CommonButton";
import Loader from "../components/Loader";

import Colors from "../colors";
import { toast } from "react-toastify";

function HrDashboard({ darkMode, setDarkMode }) {
  const color = Colors(darkMode);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const initialEmployee = {
    id: "",
    profileImage: "",
    profileImageFile: null,
    employeename: "",
    role: "",
    salary: "",
    address: "",
    email: "",
    password: "",
  };

  const [type, setType] = useState("add");
  const [show, setShow] = useState(false);
  const [employee, setEmployee] = useState(initialEmployee);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const normalizeEmployee = (item) => ({
    ...item,
    employeename: item.employeename || item.name || "",
    profileImage: item.profile_image_url || item.profileImage || "",
  });

  const getAllEmployees = async () => {
    try {
      setLoading(true);

      const res = await axios.get("https://task-17-b.onrender.com/api/users");
      setData((res.data || []).map(normalizeEmployee));
    } catch (error) {
      console.log(error);
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setEmployee(initialEmployee);
  };

  const submitHandle = async ({ formData, id }) => {
    try {
      setLoading(true);

      if (type === "add") {
        await axios.post("https://task-17-b.onrender.com/api/users", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Employee Added Successfully");
      } else {
        await axios.put(`https://task-17-b.onrender.com/api/users/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Employee Updated Successfully");
      }

      getAllEmployees();
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      await axios.delete(`https://task-17-b.onrender.com/api/users/${id}`);
      toast.success("Employee Deleted Successfully");

      getAllEmployees();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    setType("add");
    setEmployee(initialEmployee);
    setShow(true);
  };

  const handleEdit = (item) => {
    setType("edit");
    setEmployee(normalizeEmployee(item));
    setShow(true);
  };

  const handleView = (item) => {
    setType("view");
    setEmployee(normalizeEmployee(item));
    setShow(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedEmployees = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) return <Loader />;

  return (
    <>
      <AppBarr roled="hr" darkMode={darkMode} setDarkMode={setDarkMode} />

      <Box sx={{ p: 2, background: color.background, minHeight: "100vh" }}>
        {type === "view" && (
          <Dialog open={show} onClose={handleClose}>
            <DialogTitle sx={{ color: color.navbar }}>
              Employee Details
            </DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography><b>Name:</b> {employee.employeename}</Typography>
              <Typography><b>Role:</b> {employee.role}</Typography>
              <Typography><b>Salary:</b> {employee.salary}</Typography>
              <Typography><b>Address:</b> {employee.address}</Typography>
              <Typography><b>Email:</b> {employee.email}</Typography>
            </DialogContent>

            <DialogActions>
              <CommonButton
                onClick={handleClose}
                sx={{ backgroundColor: color.navbar, color: color.text }}
              >
                Close
              </CommonButton>
            </DialogActions>
          </Dialog>
        )}

        {type !== "view" && (
          <EmployeeForm
            show={show}
            handleClose={handleClose}
            type={type}
            employee={employee}
            handleChange={handleChange}
            submitHandle={submitHandle}
            darkMode={darkMode}
          />
        )}

        <EmployeeTable
          data={paginatedEmployees}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAdd={handleAdd}
          handleView={handleView}
          page={page}
          rowsPerPage={rowsPerPage}
          darkMode={darkMode}
        />

        <TablePagination
          component="div"
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ mt: 2, color: color.text }}
        />
      </Box>
    </>
  );
}

export default HrDashboard;