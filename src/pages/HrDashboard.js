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
  <div>Hello HR</div>
);
}

export default HrDashboard;