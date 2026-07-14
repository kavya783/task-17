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
    import { useDispatch, useSelector } from "react-redux";

    import LeaveTable from "../components/LeaveTable";
    import CommonButton from "../components/CommonButton";
    import AppBarr from "../components/appBar";
    import Loader from "../components/Loader";
    import Colors from "../colors";
    import { Theme } from "../GlobalStyles";

    import { getLeaveDataActionInitiate } from "../redux/actions/getLeaveAction";
    function LeavePage({
      darkMode,
      setDarkMode,
      themeColor,
      setThemeColor,
    }) {
      const color = Colors(darkMode, themeColor);

      console.log("LeavePage rendered");

    console.log("Navbar Color:", color.navbar);
      const dispatch = useDispatch();

     const { data = [], loading = false } = useSelector(
  (state) => state.getleavereducer || {}
);

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
        dispatch(getLeaveDataActionInitiate());
      }, [dispatch]);

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

      const paginatedLeaves = (data || []).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

      if (loading) {
        return <Loader />;
      }
    console.log(data);
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
              background:color.background,
               height:{xs:"100%",sm:"830px",md:"1260px",lg:"1400px",xl:"697px"},
          p: 2,
        }}
      >
            <Dialog
              open={show}
              onClose={handleClose}
              maxWidth="xs"
              fullWidth
            >
              <DialogTitle
                sx={{
                  // bgcolor: color.background,
                  color:color.card,
                    ...Theme.font20Bold,
                  borderBottom: 1,
                  mb: 1
                }}
              >
                Leave Details
              </DialogTitle>

              <DialogContent
                sx={{
                  // bgcolor: color.background,
                  color: color.text,
                  minWidth: 30,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",

                  }}
                >
                  <Typography sx={{  ...Theme.font16Bold, color: color.navbar }}>
                    Employee Name:
                  </Typography>
                    <Typography sx={{color:color.card}}>
                    {employee.employeename}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center"
                  }}
                >
                  <Typography sx={{ ...Theme.font16Bold, color: color.navbar }}>
                    Email:
                  </Typography>

                  <Typography sx={{color:color.card}}>
                    {employee.email}
                  </Typography>
                </Box>


                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",

                  }}
                >
                  <Typography sx={{ ...Theme.font16Bold, color: color.navbar }}>
                  Leave Type:
                </Typography>
                <Typography sx={{color:color.card}}>
                          {employee.leaveType}
                          </Typography>
                          </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",

                  }}
                >
                  <Typography sx={{ ...Theme.font16Bold,color: color.navbar }}>
                  From Date: 
                </Typography>
                <Typography sx={{color:color.card}}>
                  {employee.from_date}
                </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",

                  }}
                >
                  <Typography sx={{ ...Theme.font16Bold, color: color.navbar }}>
                To Date: 
                </Typography>
                <Typography sx={{color:color.card}}>
                  {employee.to_date}
                </Typography>
                </Box>
                

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",

                  }}
                >
                  <Typography sx={{ ...Theme.font16Bold, color: color.navbar }}>
                  Reason:
                </Typography>
                
                  <Typography sx={{color:color.card}}>
                  {employee.reason}

                </Typography>
                </Box>

              <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",

                  }}
                >
                  <Typography sx={{ ...Theme.font16Bold, color: color.navbar }}>
                  
                  Status:
                </Typography>
              <Typography sx={{color:color.card}}>
                  {employee.status}
                </Typography>
                </Box>
              </DialogContent>

              <DialogActions
                sx={{
                
                }}
              >
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
      themeColor={themeColor}
      refreshLeaves={() =>
        dispatch(getLeaveDataActionInitiate())
      }
    />
            <TablePagination
              component="div"
              count={data?.length || 0}
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