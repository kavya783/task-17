import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography } from "@mui/material";

import EmployeeHome from "../components/EmployeeHome";
import AppBarr from "../components/appBar";
import NavBar from "../components/NavBar";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";
import Loader from "../components/Loader";

function EmployeeDashboard({ darkMode, setDarkMode }) {
  const color = Colors(darkMode);

  const [loading, setLoading] = useState(true);
  const [leaveData, setLeaveData] = useState([]);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3000/api/users");

      setLeaveData(res.data);
    } catch (error) {
      console.log("Error fetching leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  const myLeaves = leaveData.filter(
    (item) => item.email === userEmail
  );

  const pendingLeaves = myLeaves.filter(
    (item) => item.status === "pending"
  );

  const latestLeave =
    pendingLeaves.length > 0
      ? [...pendingLeaves].sort(
          (a, b) => new Date(b.fromDate) - new Date(a.fromDate)
        )[0]
      : null;

  if (loading) return <Loader />;
        
  return (
    <>
      <AppBarr
        roled="employee"
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 728,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
            },
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            ml: {
              xs: "2%",
              sm: "10%",
              md: "10%",
            },
          }}
        >
          <Box
            sx={{
              width: 320,
              display: "flex",
              mr: {
                sm: "10%",
              },
            }}
          >
            <EmployeeHome />
          </Box>

          {latestLeave && (
            <Box sx={{ width: 300 }}>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
                  p: 1,
                  mb: 5,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: Theme.font16Bold,
                      color: color.navbar,
                      ml: 5,
                    }}
                    mb={1}
                  >
                    Latest Leave
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: Theme.font14Bold,
                        color: color.text,
                      }}
                    >
                      <b>Leave Type:</b>
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: Theme.font16SemiBold,
                        color: color.text,
                      }}
                    >
                      {latestLeave.leaveType}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: Theme.font14Bold,
                        color: color.text,
                      }}
                    >
                      <b>From Date:</b>
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: Theme.font16SemiBold,
                        color: color.text,
                      }}
                    >
                      {latestLeave.fromDate}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: Theme.font14Bold,
                        color: color.text,
                      }}
                    >
                      <b>To Date:</b>
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: Theme.font16SemiBold,
                        color: color.text,
                      }}
                    >
                      {latestLeave.toDate}
                    </Typography>
                  </Box>

                  <Typography
                    mt={1}
                    sx={{
                      fontSize: Theme.font14Bold,
                      color: color.text,
                    }}
                  >
                    <b>Status: </b>

                    <span
                      style={{
                        color:
                          latestLeave.status === "approved"
                            ? "green"
                            : latestLeave.status === "rejected"
                            ? "red"
                            : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      {latestLeave.status}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default EmployeeDashboard;