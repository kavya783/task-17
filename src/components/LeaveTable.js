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

    width: {
      xs: "100%",
      md: "75%",
      lg: "80%",
    },

    ml: {
      xs: 0,
      md: "25%",
      lg: "20%",
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
    borderBottom:"1px solid white",
    boxSizing: "border-box",
  }}
>
    <Table
      sx={{
        bgcolor: color.background,
        minWidth: 900,
      }}
    >
      <TableHead
        sx={{
          backgroundColor: color.headings,

          // Sticky header while scrolling
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
      >
        <TableRow>
          <TableCell
            sx={{
              color: color.text,
              fontSize: Theme.font16Bold,
              fontWeight: 600,
              py: 0,
              px: 2,
              minWidth: 70,
            }}
          >
            S.No
          </TableCell>

          <TableCell
            sx={{
              color: color.text,
              fontSize: Theme.font16Bold,
              fontWeight: 600,
              py: 0,
              px: 2,
              minWidth: 50,
            }}
          >
            Name
          </TableCell>

          <TableCell
            sx={{
              color: color.text,
              fontSize: Theme.font16Bold,
              fontWeight: 600,
              py: 2,
              px: 2,
              minWidth: 50,
            }}
          >
            Leave Type
          </TableCell>

          <TableCell
            sx={{
              color: color.text,
              fontSize: Theme.font16Bold,
              fontWeight: 600,
              py: 2,
              px: 2,
              minWidth: 50,
            }}
          >
            From
          </TableCell>

          <TableCell
            sx={{
              color: color.text,
              fontSize: Theme.font16Bold,
              fontWeight: 600,
              py: 2,
              px: 2,
              minWidth: 50,
            }}
          >
            To
          </TableCell>

          <TableCell
            sx={{
              color: color.text,
              fontSize: Theme.font16Bold,
              fontWeight: 600,
              py: 2,
              px: 2,
              minWidth: 50,
            }}
          >
            Status
          </TableCell>

          <TableCell
            align="center"
            sx={{
              color: color.text,
              fontSize: Theme.font16Bold,
              fontWeight: 600,
              py: 2,
              px: 2,
              minWidth: 50,
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
                py: 5,
                borderBottom: "none",
              }}
            >
              No Leaves Found
            </TableCell>
          </TableRow>
        ) : (
          leaveData.map((item, index) => (
            <TableRow
              key={item.id}
              sx={{
                "&:last-child td": {
                  borderBottom: 0,
                },

             
                
              
              }}
            >
              {/* S.No */}
              <TableCell
                sx={{
                  color: color.text,
                  fontSize: Theme.font14Regular,
                  py: 1.8,
                  px: 2,
                  whiteSpace: "nowrap",
                }}
              >
                {page * rowsPerPage + index + 1}
              </TableCell>

              {/* Name */}
              <TableCell
                sx={{
                  color: color.text,
                  fontSize: Theme.font14Regular,
                  py: 1.8,
                  px: 2,
                  maxWidth: 180,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      color: color.text,
                      fontSize: Theme.font14Regular,
                      overflow: "hidden",
                      
                    }}
                  >
                    {item.employeename}
                  </Typography>
                </Box>
              </TableCell>

              {/* Leave Type */}
              <TableCell
                sx={{
                  color: color.text,
                  fontSize: Theme.font14Regular,
                  py: 1.8,
                  px: 2,
                  whiteSpace: "nowrap",
                }}
              >
                {item.leaveType}
              </TableCell>

              {/* From */}
              <TableCell
                sx={{
                  color: color.text,
                  fontSize: Theme.font14Regular,
                  py: 1.8,
                  px: 2,
                  whiteSpace: "nowrap",
                }}
              >
                {item.from_date}
              </TableCell>

              {/* To */}
              <TableCell
                sx={{
                  color: color.text,
                  fontSize: Theme.font14Regular,
                  py: 1.8,
                  px: 2,
                  whiteSpace: "nowrap",
                }}
              >
                {item.to_date}
              </TableCell>

              {/* Status */}
              <TableCell
                sx={{
                  color: color.text,
                  fontSize: Theme.font14Regular,
                  py: 1.8,
                  px: 2,
                  whiteSpace: "nowrap",
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
                    fontSize: Theme.font14Regular,
                    textTransform: "capitalize",
                  }}
                >
                  {item.status}
                </Typography>
              </TableCell>

              {/* Actions */}
              <TableCell
                align="center"
                sx={{
                  py: 1.8,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    flexWrap: "nowrap",
                  }}
                >
                  <CommonButton
                    onClick={() => handleView(item)}
                    sx={{
                      backgroundColor: color.headings,
                      color: color.text,
                      minWidth: 65,
                      whiteSpace: "nowrap",
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
                      minWidth: 85,
                      whiteSpace: "nowrap",
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
                      minWidth: 80,
                      whiteSpace: "nowrap",
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