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
  Paper
} from "@mui/material";

import { Theme } from "../GlobalStyles";
import Colors from "../colors";
import Loader from "./Loader";
import CommonButton from "./CommonButton";

export default function EmployeeLeave({ darkMode, setDarkMode }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const isMobile = useMediaQuery("(max-width:600px)");
  const color = Colors(darkMode);

  const userEmail = localStorage.getItem("email");

  // ✅ FETCH DATA (NO REDUX)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "http://localhost:3000/api/leaves"
        );
        const result = await res.json();

        const list = Object.keys(result || {}).map((key) => ({
          id: key,
          ...result[key]
        }));

        setData(list);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ FILTER USER DATA
  const filteredData = data.filter((item) => item.email === userEmail);

  const getStatusColor = (status) => {
    if (status === "approved") return "success";
    if (status === "rejected") return "error";
    return "warning";
  };

  if (loading) return <Loader />;

  return (
    <>
      <AppBarr
        roled="employee"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Box
        sx={{
          bgcolor: color.background,
          height: 670
        }}
      >
        <Box
          sx={{
            p: 2,
            mt: 7,
            ml: { md: "240px" }
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: "bold",
              bgcolor: color.text,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            My Leave Status
          </Typography>

          {/* ================= MOBILE VIEW ================= */}
          {isMobile ? (
            filteredData.length === 0 ? (
              <Typography align="center" color="text.secondary">
                No Leaves Found
              </Typography>
            ) : (
              filteredData.map((item) => (
                <Card key={item.id} sx={{ mb: 2, borderRadius: 3 }}>
                  <CardContent>
                    <Typography sx={{ color: color.card }}>
                      <b>Name:</b> {item.employeename}
                    </Typography>

                    <Typography sx={{ color: color.card }}>
                      <b>Leave Type:</b> {item.leaveType}
                    </Typography>

                    <Typography sx={{ color: color.card }}>
                      <b>Date:</b> {item.fromDate} → {item.toDate}
                    </Typography>

                    <Chip
                      label={item.status || "pending"}
                      color={getStatusColor(item.status)}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                </Card>
              ))
            )
          ) : (
            /* ================= TABLE VIEW ================= */
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 4,
                width: "70%",
                mx: "auto",
                backgroundColor: color.background
              }}
            >
              <Table>
                <TableHead sx={{ bgcolor: color.headings, height: 50 }}>
                  <TableRow>
                    <TableCell sx={{ color: color.text }}>S.No</TableCell>
                    <TableCell sx={{ color: color.text }}>Name</TableCell>
                    <TableCell sx={{ color: color.text }}>
                      Leave Type
                    </TableCell>
                    <TableCell sx={{ color: color.text }}>
                      From Date
                    </TableCell>
                    <TableCell sx={{ color: color.text }}>
                      To Date
                    </TableCell>
                    <TableCell sx={{ color: color.text }}>Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No Leaves Found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((item, index) => (
                      <TableRow key={item.id} hover>
                        <TableCell sx={{ color: color.text }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ color: color.text }}>
                          {item.employeename}
                        </TableCell>
                        <TableCell sx={{ color: color.text }}>
                          {item.leaveType}
                        </TableCell>
                        <TableCell sx={{ color: color.text }}>
                          {item.from_date}
                        </TableCell>
                        <TableCell sx={{ color: color.text }}>
                          {item.to_date}
                        </TableCell>
                        <TableCell sx={{ color: color.text }}>
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
                                  : color.background,
                              color: color.text
                            }}
                          >
                            {item.status || "pending"}
                          </CommonButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </>
  );
}