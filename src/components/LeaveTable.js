import React, { useEffect, useState } from "react";
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
  Paper,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import CommonButton from "./CommonButton";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";

import { updateLeaveDataActionInitiate } from "../redux/actions/updateLeaveAction";

export default function LeaveTable({
  data = [],
  handleView,
  page,
  rowsPerPage,
  darkMode,
  appliedBy,
}) {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width:600px)");
  const color = Colors(darkMode);

  // Local data for immediate UI update
  const [leaveData, setLeaveData] = useState(data);

  // Sync local data whenever Redux data changes
  useEffect(() => {
    setLeaveData(data);
  }, [data]);

  const updateLeave = async (item, status) => {
    try {
      const updatedLeave = {
        ...item,
        status,
      };

      // Update backend
      await dispatch(
        updateLeaveDataActionInitiate(
          updatedLeave,
          item.id,
          appliedBy
        )
      );

      // Immediately update UI
      setLeaveData((prevData) =>
        prevData.map((leave) =>
          leave.id === item.id
            ? {
                ...leave,
                status,
              }
            : leave
        )
      );

     
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

      {/* ================= MOBILE ================= */}
      {isMobile ? (
        <Box>
          {leaveData.length === 0 ? (
            <Card
              sx={{
                mb: 2,
                boxShadow: `0px 4px 10px ${color.text}`,
                color: color.text,
              }}
            >
              <CardContent>
                <Typography
                  align="center"
                  sx={{
                    color: color.text,
                    fontSize: Theme.font16Bold,
                    py: 3,
                  }}
                >
                  No Leaves Found
                </Typography>
              </CardContent>
            </Card>
          ) : (
            leaveData.map((item) => (
              <Card
                key={item.id}
                sx={{
                  mb: 2,
                  mt: 3,
                  boxShadow: 3,
                  color: color.card,
                }}
              >
                <CardContent>
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
                              : color.card,
                      }}
                    >
                      {item.status}
                    </span>
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      mt: 2,
                      justifyContent: "space-between",
                      flexWrap: "nowrap",
                    }}
                  >
                    <CommonButton
                      onClick={() => handleView(item)}
                      sx={{
                        backgroundColor: color.headings,
                        color: color.text,
                        minWidth: 70,
                      }}
                    >
                      View
                    </CommonButton>

                    <CommonButton
                      onClick={() =>
                        updateLeave(item, "approved")
                      }
                      sx={{
                        backgroundColor:
                          item.status === "approved"
                            ? color.navbar
                            : color.background,
                        color: color.text,
                        minWidth: 90,
                      }}
                    >
                      {item.status === "approved"
                        ? "Approved"
                        : "Approve"}
                    </CommonButton>

                    <CommonButton
                      onClick={() =>
                        updateLeave(item, "rejected")
                      }
                      sx={{
                        backgroundColor:
                          item.status === "rejected"
                            ? color.navbar
                            : color.background,
                        color: color.text,
                        minWidth: 90,
                      }}
                    >
                      {item.status === "rejected"
                        ? "Rejected"
                        : "Reject"}
                    </CommonButton>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      ) : (
        /* ================= DESKTOP ================= */
        <Box
          sx={{
            mt: 2,
            width: { lg: "65%" },
            ml: { md: "25%", lg: "20%" },
          }}
        >
          <TableContainer
           component={Paper}
            sx={{
              width: "90%",
                  mx: "auto",
                  overflowX: "auto",
              borderRadius: 3,
              boxShadow: 2,
              backgroundColor: color.background,
              borderRight: "1px solid white",
              borderLeft: "1px solid white",
            }}
          >
            <Table
                             sx={{
                             
                               bgcolor: color.background,
                               
                             }}
                           >
              <TableHead
                sx={{
                  backgroundColor: color.headings,
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    S.No
                  </TableCell>

                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Name
                  </TableCell>

                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Leave Type
                  </TableCell>

                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    From
                  </TableCell>

                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    To
                  </TableCell>

                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Status
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {leaveData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
                      sx={{
                        color: color.text,
                        fontSize: Theme.font16Bold,
                        py: 3,
                      }}
                    >
                      No Leaves Found
                    </TableCell>
                  </TableRow>
                ) : (
                  leaveData.map((item, index) => (
                    <TableRow key={item.id}>
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
                          {item.employeename}
                        </Box>
                      </TableCell>

                      <TableCell
                        sx={{
                          color: color.text,
                          fontSize: Theme.font14Regular,
                        }}
                      >
                        {item.leaveType}
                      </TableCell>

                      <TableCell
                        sx={{
                          color: color.text,
                          fontSize: Theme.font14Regular,
                        }}
                      >
                        {item.from_date}
                      </TableCell>

                      <TableCell
                        sx={{
                          color: color.text,
                          fontSize: Theme.font14Regular,
                        }}
                      >
                        {item.to_date}
                      </TableCell>

                      <TableCell
                        sx={{
                          color: color.text,
                          fontSize: Theme.font14Regular,
                        }}
                      >
                        <Typography
                          sx={{
                            color:
                              item.status === "approved"
                                ? "green"
                                : item.status === "rejected"
                                  ? "red"
                                  : "orange",
                            fontWeight: "bold",
                          }}
                        >
                          {item.status}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                          }}
                        >
                          <CommonButton
                            onClick={() =>
                              handleView(item)
                            }
                            sx={{
                              backgroundColor:
                                color.headings,
                              color: color.text,
                            }}
                          >
                            View
                          </CommonButton>

                          <CommonButton
                            onClick={() =>
                              updateLeave(
                                item,
                                "approved"
                              )
                            }
                            sx={{
                              backgroundColor:
                                item.status === "approved"
                                  ? color.navbar
                                  : color.background,
                              color: color.text,
                            }}
                          >
                            {item.status === "approved"
                              ? "Approved"
                              : "Approve"}
                          </CommonButton>

                          <CommonButton
                            onClick={() =>
                              updateLeave(
                                item,
                                "rejected"
                              )
                            }
                            sx={{
                              backgroundColor:
                                item.status === "rejected"
                                  ? color.navbar
                                  : color.background,
                              color: color.text,
                            }}
                          >
                            {item.status === "rejected"
                              ? "Rejected"
                              : "Reject"}
                          </CommonButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}