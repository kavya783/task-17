import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
} from "@mui/material";
import axios from "axios";

import LeaveTable from "../components/LeaveTable";
import CommonButton from "../components/CommonButton";
import AppBarr from "../components/appBar";
import Loader from "../components/Loader";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";

function LeavePage({ darkMode, setDarkMode }) {
  const color = Colors(darkMode);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const initialEmployee = {
    employeename: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    email: "",
    reason: "",
    status: "",
  };

  const [show, setShow] = useState(false);
  const [employee, setEmployee] = useState(initialEmployee);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getAllLeaves();
  }, []);

 const getAllLeaves = async () => {
  try {
    setLoading(true);

    const res = await axios.get("https://task-17-b.onrender.com/api/leaves");

    console.log(res.data);

    setData(res.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const handleClose = () => {
    setShow(false);
    setEmployee(initialEmployee);
  };

  const handleView = (item) => {
    setEmployee(item);
    setShow(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const paginatedLeaves = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) return <Loader />;

  return (
    <>
      <AppBarr
        roled="hr"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Box
        sx={{
          background: color.background,
          minHeight: "100vh",
          p: 2,
        }}
      >
        <Dialog open={show} onClose={handleClose}>
          <DialogTitle
            sx={{
              bgcolor: color.background,
              color: color.text,
            }}
          >
            Leave Details
          </DialogTitle>

          <DialogContent
            sx={{
              bgcolor: color.background,
              color: color.text,
              minWidth: 350,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography sx={{ fontSize: Theme.font16SemiBold }}>
              <b>Name:</b> {employee.employeename}
            </Typography>

            <Typography sx={{ fontSize: Theme.font16SemiBold }}>
              <b>Email:</b> {employee.email}
            </Typography>

            <Typography sx={{ fontSize: Theme.font16SemiBold }}>
              <b>Leave Type:</b> {employee.leaveType}
            </Typography>

            <Typography sx={{ fontSize: Theme.font16SemiBold }}>
              <b>From Date:</b> {employee.from_date}
            </Typography>

            <Typography sx={{ fontSize: Theme.font16SemiBold }}>
              <b>To Date:</b> {employee.to_date}
            </Typography>

            <Typography sx={{ fontSize: Theme.font16SemiBold }}>
              <b>Reason:</b> {employee.reason}
            </Typography>

            <Typography sx={{ fontSize: Theme.font16SemiBold }}>
              <b>Status:</b> {employee.status}
            </Typography>
          </DialogContent>

          <DialogActions sx={{ bgcolor: color.background }}>
            <CommonButton
              onClick={handleClose}
              sx={{
                backgroundColor: color.navbar,
                color: color.text,
              }}
            >
              Close
            </CommonButton>
          </DialogActions>
        </Dialog>

        <LeaveTable
          data={paginatedLeaves}
          handleView={handleView}
          page={page}
          rowsPerPage={rowsPerPage}
          darkMode={darkMode}
          refreshLeaves={getAllLeaves}
        />

        <TablePagination
          component="div"
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "end",
            color: color.text,
          }}
        />
      </Box>
    </>
  );
}

export default LeavePage;