import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

import CommonButton from "./CommonButton";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";

export default function LeaveTable({
  data = [],
  handleView,
  page,
  rowsPerPage,
  darkMode,
  refreshLeaves,
}) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const color = Colors(darkMode);

const updateLeave = async (item, status) => {
  try {
    await axios.put(
      `https://task-17-b.onrender.com/api/leaves/${item.id}`,
      {
        leave: {
          status: status
        }
      }
    );

    toast.success(`Leave ${status} successfully`);

    if (refreshLeaves) refreshLeaves();
  } catch (error) {
    console.log(error);
    toast.error("Failed to update leave");
  }
};
  return (
    <>
      <Typography
        sx={{
          color: color.text,
          fontSize: Theme.font20Bold,
          mt: 10,
          ml: { md: "25%", lg: "20%" },
        }}
      >
        Leaves List:
      </Typography>

      {isMobile ? (
        <Box>
          {data.map((item) => (
            <Card
              key={item._id}
              sx={{
                mb: 2,
                boxShadow: 3,
                mt: 3,
                color: color.card,
              }}
            >
              <CardContent>
                <Box sx={{ textAlign: "center", mb: 1 }}>
                  <img
                    src={item.profileImage || "https://via.placeholder.com/60"}
                    alt="profile"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                    }}
                  />
                </Box>

                <Typography sx={{ color: color.card }}>
                  <b>Name:</b> {item.employeename}
                </Typography>

                <Typography sx={{ color: color.card }}>
                  <b>Type:</b> {item.leaveType}
                </Typography>

                <Typography sx={{ color: color.card }}>
                  <b>From:</b> {item.from_date}
                </Typography>

                <Typography sx={{ color: color.card }}>
                  <b>To:</b> {item.to_date}
                </Typography>

                <Typography sx={{ color: color.card }}>
                  <b>Status:</b>{" "}
                  <span
                    style={{
                      color:
                        item.status === "approved"
                          ? color.navbar
                          : item.status === "rejected"
                          ? color.headings
                          : color.text,
                    }}
                  >
                    {item.status}
                  </span>
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  <CommonButton
                    onClick={() => handleView(item)}
                    sx={{
                      backgroundColor: color.headings,
                      color: color.text,
                      fontSize: Theme.font14Bold,
                    }}
                  >
                    View
                  </CommonButton>

                  <CommonButton
                     onClick={() => updateLeave(item, "approved")}
                    sx={{
                      backgroundColor:
                        item.status === "approved"
                          ? color.navbar
                          : color.background,
                      color: color.text,
                    }}
                  >
                    {item.status === "approved" ? "Approved" : "Approve"}
                  </CommonButton>

                  <CommonButton
                    onClick={() => updateLeave(item, "rejected")}
                    sx={{
                      backgroundColor:
                        item.status === "rejected"
                          ? color.navbar
                          : color.background,
                      color: color.text,
                    }}
                  >
                    {item.status === "rejected" ? "Rejected" : "Reject"}
                  </CommonButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            mt: 2,
            width: { lg: "65%" },
            ml: { md: "25%", lg: "20%" },
          }}
        >
          <TableContainer
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              backgroundColor: color.background,
            }}
          >
            <Table size="small">
              <TableHead
                sx={{
                  backgroundColor: color.headings,
                }}
              >
                <TableRow>
                  <TableCell sx={{ color: color.text }}>S.No</TableCell>
                  <TableCell sx={{ color: color.text }}>Employee</TableCell>
                  <TableCell sx={{ color: color.text }}>Leave Type</TableCell>
                  <TableCell sx={{ color: color.text }}>From</TableCell>
                  <TableCell sx={{ color: color.text }}>To</TableCell>
                  <TableCell sx={{ color: color.text }}>Status</TableCell>
                  <TableCell align="center" sx={{ color: color.text }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell sx={{ color: color.text }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>

                    <TableCell sx={{ color: color.text }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <img
                          src={
                            item.profileImage ||
                            "https://via.placeholder.com/40"
                          }
                          alt=""
                          width="40"
                          height="40"
                          style={{ borderRadius: "50%" }}
                        />

                        {item.employeename}
                      </Box>
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
                      {item.status}
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <CommonButton
                          onClick={() => handleView(item)}
                          sx={{
                            backgroundColor: color.headings,
                            color: color.text,
                          }}
                        >
                          View
                        </CommonButton>

                        <CommonButton
                         onClick={() => updateLeave(item, "approved")}
                          sx={{
                            backgroundColor:
                              item.status === "approved"
                                ? color.navbar
                                : color.background,
                            color: color.text,
                          }}
                        >
                          Approve
                        </CommonButton>
                    
                        <CommonButton
                          onClick={() => updateLeave(item, "rejected")}
                          sx={{
                            backgroundColor:
                              item.status === "rejected"
                                ? color.navbar
                                : color.background,
                            color: color.text,
                          }}
                        >
                          Reject
                        </CommonButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}