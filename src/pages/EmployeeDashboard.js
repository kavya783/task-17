import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import EmployeeHome from "../components/EmployeeHome";
import AppBarr from "../components/appBar";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";

import Colors from "../colors";

import { getLeaveDataActionInitiate } from "../redux/actions/getLeaveAction";


function EmployeeDashboard({
  darkMode,
  setDarkMode,
  themeColor,
  setThemeColor,
}) {
const color = Colors(darkMode, themeColor);

  const dispatch = useDispatch();


  const {
    loading
  } = useSelector(
    (state) => state.getleavereducer || {}
  );



  useEffect(() => {

    dispatch(
      getLeaveDataActionInitiate()
    );

  }, [dispatch]);



  if (loading) {
    return <Loader />;
  }



  return (
    <>

      <AppBarr
  roled="employee"
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  themeColor={themeColor}
  setThemeColor={setThemeColor}
/>


     <NavBar
  darkMode={darkMode}
  themeColor={themeColor}
  open={open}
  setOpen={setOpen}
/>

      <Box
        sx={{
          bgcolor: color.background,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height:{xs:"650px",sm:"650px",md:"870px",lg:"1000px",xl:"729px"},
        }}
      >

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row"
            },
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            ml: {
              xs: "2%",
              sm: "10%",
              md: "10%"
            }
          }}
        >

          <Box
            sx={{
              width: 300,
              display: "flex",
              mr: {
                sm: "10%"
              }
            }}
          >

            <EmployeeHome />

          </Box>


        </Box>


      </Box>


    </>
  );
}


export default EmployeeDashboard;