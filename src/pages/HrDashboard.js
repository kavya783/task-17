import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
  Avatar,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import AppBarr from "../components/appBar";
import CommonButton from "../components/CommonButton";
import Loader from "../components/Loader";

import Colors from "../colors";
import { toast } from "react-toastify";

import { getEmployeeDataActionInitiate } from "../redux/actions/getEmployeeAction";
import { addEmployeeDataActionInitiate } from "../redux/actions/addEmployeeAction";
import { updateEmployeeDataActionInitiate } from "../redux/actions/updateEmployeeAction";
import { deleteEmployeeDataActionInitiate } from "../redux/actions/deleteEmployeeAction";
import { Theme } from "../GlobalStyles";

function HrDashboard({
  darkMode,
  setDarkMode,
  themeColor,
  setThemeColor,
}) {
  const color = Colors(darkMode, themeColor);

  const dispatch = useDispatch();

 const employeeState = useSelector(
  (state) => state
);

console.log("FULL REDUX STATE", employeeState);

const { data = [], loading = false } =
  employeeState.getemployeedata || {};
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
    dispatch(getEmployeeDataActionInitiate());
  }, [dispatch]);

  const normalizeEmployee = (item) => ({
    ...item,
    employeename: item.employeename || item.name || "",
    profileImage: item.profile_image_url || item.profileImage || "",
  });

const employees = (data || []).map(normalizeEmployee);

  const handleClose = () => {
    setShow(false);
    setEmployee(initialEmployee);
  };

  const submitHandle = async ({ formData, id }) => {
    try {
      if (type === "add") {
        dispatch(addEmployeeDataActionInitiate(formData));
      } else {
        dispatch(updateEmployeeDataActionInitiate(formData, id));
      }

      handleClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );


    if (confirmDelete) {

      try {

        await dispatch(deleteEmployeeDataActionInitiate(id));
        dispatch(getEmployeeDataActionInitiate());

      } catch (error) {

        toast.error("Delete failed");

      }

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

  const paginatedEmployees = employees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
 
console.log("Employee Redux State:", {data, loading});
  if (loading) return <Loader />;
  console.log("HrDashboard rendered");
  
  return (
    <>
      <AppBarr
        roled="hr"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
      />

      <Box
        sx={{
          p: 2,
          background: color.background,
          height: { xs: "100%", sm: "610px", md: "830px", lg: "1260px", xl: "698px" },
        }}
      >
        {type === "view" && (
          <Dialog
            open={show}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle
              sx={{
                textAlign: "center",
                fontSize: Theme.font20Bold,
                bgcolor: color.navbar,
                color: color.text,
              }}
            >
              Employee Details
            </DialogTitle>

            <DialogContent sx={{ p: 4 }}>

              {/* Profile Image */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 4,
                  mt: 2
                }}
              >
                <Avatar
                  src={employee.profile_image_url || employee.profileImage}
                  sx={{
                    width: 100,
                    height: 100,

                    bgcolor: color.headings,
                    border: "4px solid",
                    borderColor: color.navbar,
                    boxShadow: 4,
                  }}
                >
                  {employee.employeename?.charAt(0).toUpperCase()}
                </Avatar>
              </Box>

              {/* Details */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",
                    borderBottom: "1px solid #ddd",
                    pb: 1,
                  }}
                >
                  <Typography sx={{ fontSize: Theme.font16Bold }}>
                    Employee Name:
                  </Typography>

                  <Typography sx={{ fontSize: Theme.font14Regular }}>
                    {employee.employeename}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",
                    borderBottom: "1px solid #ddd",
                    pb: 1,
                  }}
                >
                  <Typography sx={{ fontSize: Theme.font16Bold }}>
                    Email:
                  </Typography>

                  <Typography sx={{ fontSize: Theme.font14Regular }}>
                    {employee.email}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",
                    borderBottom: "1px solid #ddd",
                    pb: 1,
                  }}
                >
                  <Typography sx={{ fontSize: Theme.font16Bold }}>
                    Role:
                  </Typography>

                  <Typography sx={{ fontSize: Theme.font14Regular }}>
                    {employee.role}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",
                    borderBottom: "1px solid #ddd",
                    pb: 1,
                  }}
                >
                  <Typography sx={{ fontSize: Theme.font16Bold }}>
                    Salary:
                  </Typography>

                  <Typography sx={{ fontSize: Theme.font14Regular }}>
                    ₹ {employee.salary}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography sx={{ fontSize: Theme.font16Bold }}>
                    Address:
                  </Typography>

                  <Typography
                    sx={{
                      textAlign: "right",
                      maxWidth: "60%",
                      fontSize: Theme.font14Regular,
                    }}
                  >
                    {employee.address}
                  </Typography>
                </Box>

              </Box>
            </DialogContent>

            <DialogActions
              sx={{
                justifyContent: "center",
                pb: 3,
              }}
            >
              <CommonButton
                onClick={handleClose}
                sx={{
                  px: 5,
                  bgcolor: color.navbar,
                  color: color.text,
                }}
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
            themeColor={themeColor}
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
          themeColor={themeColor}
        />

        <TablePagination
          component="div"
          count={employees.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            mt: 2,
            color: color.text,
          }}
        />
      </Box>
    </>
  );
}

export default HrDashboard;