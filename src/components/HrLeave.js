import React, { useEffect, useState } from "react";
import AppBarr from "./appBar";
import NavBar from "./NavBar";

import {
  Box,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  TablePagination
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { Theme } from "../GlobalStyles";
import Colors from "../colors";
import Loader from "./Loader";
import CommonButton from "./CommonButton";

import { getLeaveDataActionInitiate } from "../redux/actions/getLeaveAction";


export default function HRLeave({ darkMode, setDarkMode }) {

  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isMobile = useMediaQuery("(max-width:600px)");
  const color = Colors(darkMode);


  const { data = [] } = useSelector(
    (state) => state.getleavereducer || {}
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  useEffect(() => {

    const fetchLeaves = async () => {

      setLoading(true);

      await dispatch(
        getLeaveDataActionInitiate("hr")
      );

      setLoading(false);

    };


    fetchLeaves();

  }, [dispatch]);



  // HR own leaves
  const filteredData = data || [];

  const paginatedLeaves = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const getStatusColor = (status) => {

    if (status === "approved")
      return "success";

    if (status === "rejected")
      return "error";

    return "warning";

  };



  if (loading)
    return <Loader />;



  return (
    <>

      <AppBarr
        roled="hr"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />


      <NavBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />


      <Box
        sx={{
          bgcolor: color.background,
          minHeight: "100vh"
        }}
      >


        <Box
          sx={{
            p: 2,
            mt: 7,
            ml: {
              md: "240px"
            }
          }}
        >


          <Typography
            variant="h5"
            sx={{
              mb: 3,
              ...Theme.font24Bold,
              bgcolor: color.headings,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              ml: { xs: 0, lg: 10 }
            }}
          >
            HR Leave Status
          </Typography>



          {
            isMobile ? (


              filteredData.length === 0 ? (


                <Card
                  sx={{
                    mt: 2,
                    p: 2,
                    textAlign: "center",
                    boxShadow: 2,
                    borderRadius: 2,
                    bgcolor: darkMode ? "#1E1E1E" : "#fff",
                    border: darkMode ? `1px solid ${color.border}` : "1px solid #e0e0e0",
                  }}
                >

                  <CardContent>


                    <Typography
                      sx={{
                        color: color.text,
                        ...Theme.font16Bold,
                      }}
                    >
                      No Leaves Found
                    </Typography >



                  </CardContent>


                </Card>


              ) : (


                paginatedLeaves.map((item) => (

                  <Card
                    key={item.id}
                    sx={{
                      mb: 2,
                      boxShadow: `0px 4px 10px ${color.text}`,
                      color: color.text
                    }}
                  >

                    <CardContent>


                      <Typography sx={{ color: color.card }}>
                        <b>Name:</b> {item.employeename}
                      </Typography>


                      <Typography sx={{ color: color.card }}>
                        <b>Leave Type:</b> {item.leaveType}
                      </Typography>


                      <Typography sx={{ color: color.card }}>
                        <b>Date:</b>
                        {item.from_date} - {item.to_date}
                      </Typography>


                      <Chip
                        label={
                          item.status || "pending"
                        }
                        color={
                          getStatusColor(item.status)
                        }
                        sx={{ mt: 1 }}
                      />


                    </CardContent>


                  </Card>


                ))


              )


            ) : (

              <Box
                sx={{
                  mt: 2,

                  width: {
                    xs: "100%",
                    md: "90%",
                    lg: "90%",
                  },

                  ml: {
                    xs: 0,
                    md: "8%",
                    lg: "10%",
                  },

                  boxSizing: "border-box",
                }}
              >

                <TableContainer
                  component={Paper}
                  sx={{
                    width: {
                      xs: "100%",
                      md: "100%",
                      lg: "90%",
                    },
                    maxWidth: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",

                    borderRadius: 3,
                    boxShadow: 2,

                    backgroundColor: color.background,

                    borderLeft: "1px solid white",
                    borderRight: "1px solid white",
                    borderBottom: "1px solid white",
                    boxSizing: "border-box",
                  }}
                >
                  <Table
                    sx={{
                      minWidth: 900,
                      bgcolor: color.background,

                    }}
                  >

                    <TableHead sx={{ bgcolor: color.headings, height: 50 }}>

                      <TableRow>


                        <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold, minWidth: 30, }}>
                          S.No
                        </TableCell>


                        <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold, minWidth: 50, }}>
                          Name
                        </TableCell>


                        <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold, minWidth: 50, }}>
                          Leave Type
                        </TableCell>


                        <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold, minWidth: 50, }}>
                          From Date
                        </TableCell>


                        <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold, minWidth: 50, }}>
                          To Date
                        </TableCell>


                        <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold, minWidth: 50, }}>
                          Status
                        </TableCell>


                      </TableRow>


                    </TableHead>



                    <TableBody sx={{ bgcolor: color.background }}>


                      {filteredData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            <Typography align="center" sx={{ color: color.card }}>
                              No Leaves Found
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedLeaves.map((item, index) => (
                          <TableRow key={item.id} hover>
                            <TableCell>
                              {page * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell sx={{ color: color.text, fontSize: Theme.font14Regular }}>
                              {item.employeename}
                            </TableCell>


                            <TableCell sx={{ color: color.text, fontSize: Theme.font14Regular }}>
                              {item.leaveType}
                            </TableCell>


                            <TableCell sx={{ color: color.text, fontSize: Theme.font14Regular }}>
                              {item.from_date}
                            </TableCell>


                            <TableCell sx={{ color: color.text, fontSize: Theme.font14Regular }}>
                              {item.to_date}
                            </TableCell>


                            <TableCell sx={{ color: color.card, fontSize: Theme.font14Regular }}>
                              <CommonButton
                                variant="contained"
                                size="small"
                                sx={{
                                  textTransform: "capitalize",
                                  fontSize: Theme.font12Bold,
                                  borderRadius: "20px",
                                  backgroundColor:
                                    item.status === "approved"
                                      ? color.navbar
                                      : item.status === "rejected"
                                        ? color.headings
                                        : color.card,

                                }}
                              >
                                {item.status || "pending"}
                              </CommonButton>
                            </TableCell>


                          </TableRow>


                        ))


                      )
                      }


                    </TableBody>



                  </Table>


                </TableContainer>
              </Box>


            )


          }
          <TablePagination
            component="div"
            count={filteredData.length}
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


      </Box>


    </>
  );
}