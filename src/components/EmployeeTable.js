import React, { useState, memo } from "react";
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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { List } from "react-window";

import CommonButton from "./CommonButton";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function EmployeeTable({
  data = [],
  handleEdit,
  handleDelete,
  handleAdd,
  handleView,
  page,
  rowsPerPage,
  darkMode,
}) {
  const isMobile = useMediaQuery("(max-width:500px)");

  const filteredData = data.filter(
    (item) => item.role !== "hr"
  );

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const color = Colors(darkMode);

  const getProfileImage = (item) =>
    item.profile_image_url ||
    item.profileImage ||
    "https://via.placeholder.com/60";

  const handleOpenDelete = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      handleDelete(selectedId);
    }

    handleCloseDelete();
  };

  /*
   * Virtualized Employee Row
   *
   * Only the rows currently visible inside
   * the scrolling area are rendered.
   */
const VirtualizedRow = ({ index, style }) => {
    const item = filteredData[index];

    if (!item) return null;

    return (
      <div style={style}>
        <TableRow
          sx={{
            display: "table",
            tableLayout: "fixed",
            width: "100%",
            height: "60px",
          }}
        >
          <TableCell
            sx={{
              color: color.text,
              width: "8%",
            }}
          >
            {page * rowsPerPage + index + 1}
          </TableCell>

          <TableCell
            sx={{
              width: "18%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <img
                src={getProfileImage(item)}
                alt="profile"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <Tooltip
                title={item.employeename || ""}
                arrow
              >
                <Typography
                  sx={{
                    color: color.text,
                    fontSize: Theme.font16Bold,
                    maxWidth: "80px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.employeename}
                </Typography>
              </Tooltip>
            </Box>
          </TableCell>

          <TableCell
            sx={{
              color: color.text,
              fontSize: Theme.font14Regular,
              width: "12%",
            }}
          >
            {item.role}
          </TableCell>

          <TableCell
            sx={{
              color: color.text,
              fontSize: Theme.font14Regular,
              width: "12%",
            }}
          >
            {item.salary}
          </TableCell>

          <TableCell
            sx={{
              color: color.text,
              fontSize: Theme.font14Regular,
              width: "18%",
            }}
          >
            {item.address}
          </TableCell>

          <TableCell
            sx={{
              color: color.text,
              fontSize: Theme.font14Regular,
              width: "20%",
            }}
          >
            {item.email}
          </TableCell>

          <TableCell
            sx={{
              width: "12%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <span
                onClick={() => handleView(item)}
                style={{ cursor: "pointer" }}
              >
                <VisibilityIcon
                  sx={{
                    fontSize: 18,
                    color: color.text,
                  }}
                />
              </span>

              <span
                onClick={() => handleEdit(item)}
                style={{ cursor: "pointer" }}
              >
                <EditIcon
                  sx={{
                    fontSize: 18,
                    color: color.text,
                  }}
                />
              </span>

              <span
                onClick={() =>
                  handleOpenDelete(item.id)
                }
                style={{ cursor: "pointer" }}
              >
                <DeleteIcon
                  sx={{
                    fontSize: 18,
                    color: color.text,
                  }}
                />
              </span>
            </Box>
          </TableCell>
        </TableRow>
      </div>
    );
  };

  return (
    <>
      {/* ================= HEADER ================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          ml: {
            md: 31,
            lg: 35,
            xl: 38,
          },
          mr: {
            lg: 28,
            xl: 26,
          },
          mt: 15,
        }}
      >
        <Typography
          sx={{
            mr: {
              xs: 3,
              sm: 55,
              md: 40,
              lg: 10,
              xl: 5,
            },
            color: color.text,
            fontSize: Theme.font24Bold,
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          Employee List:
        </Typography>

        <Typography
          sx={{
            mr: {
              xs: 3,
              sm: 55,
              md: 40,
              lg: 10,
              xl: 5,
            },
            color: color.text,
            fontSize: Theme.font16Bold,
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          Employee List:
        </Typography>

        <CommonButton
          variant="contained"
          sx={{
            color: color.text,
            backgroundColor: color.headings,
            ml: 3,
            fontSize: Theme.font12Bold,
            display: {
              xs: "block",
              md: "none",
            },
          }}
          onClick={handleAdd}
        >
          Add Employee
        </CommonButton>

        <CommonButton
          variant="contained"
          sx={{
            color: color.text,
            backgroundColor: color.headings,
            ml: 3,
            fontSize: Theme.font16Bold,
            display: {
              xs: "none",
              md: "block",
            },
          }}
          onClick={handleAdd}
        >
          Add Employee
        </CommonButton>
      </Box>

      {/* ================= MOBILE ================= */}

      {isMobile ? (
        <Box>
          {filteredData.length === 0 ? (
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
                  No Employees Found
                </Typography>
              </CardContent>
            </Card>
          ) : (
            filteredData.map((item) => (
              <Card
                key={item.id}
                sx={{
                  mb: 2,
                  boxShadow: `0px 4px 10px ${color.text}`,
                  color: color.text,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      textAlign: "center",
                      mb: 1,
                    }}
                  >
                    <img
                      src={getProfileImage(item)}
                      alt="profile"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      color: color.card,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Name: {item.employeename}
                  </Typography>

                  <Typography
                    sx={{
                      color: color.card,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Role: {item.role}
                  </Typography>

                  <Typography
                    sx={{
                      color: color.card,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Salary: {item.salary}
                  </Typography>

                  <Typography
                    sx={{
                      color: color.card,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Address: {item.address}
                  </Typography>

                  <Typography
                    sx={{
                      color: color.card,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Email: {item.email}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: "clamp(90px, 3vw, 24px)",
                      mt: 2,
                      ml: 1,
                    }}
                  >
                    <span
                      onClick={() => handleView(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <VisibilityIcon
                        sx={{
                          fontSize: Theme.font16Bold,
                          color: color.card,
                          ml: 1,
                        }}
                      />
                    </span>

                    <span
                      onClick={() => handleEdit(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <EditIcon
                        sx={{
                          fontSize: 24,
                          color: color.card,
                        }}
                      />
                    </span>

                    <span
                      onClick={() =>
                        handleOpenDelete(item.id)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <DeleteIcon
                        sx={{
                          fontSize: 24,
                          color: color.card,
                        }}
                      />
                    </span>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      ) : (
        /* ================= DESKTOP TABLE ================= */

        <Box
          sx={{
            mt: 2,
            width: {
              lg: "66%",
            },
            ml: {
              md: "25%",
              lg: "20%",
            },
          }}
        >
          <TableContainer
            sx={{
              width: "100%",
              boxShadow: 2,
              borderRadius: 2,
              borderRight: "1px solid white",
              borderLeft: "1px solid white",
            }}
          >
            <Table
              size="small"
              sx={{
                tableLayout: "fixed",
                width: "100%",
              }}
            >
              {/* ================= TABLE HEADER ================= */}

              <TableHead
                sx={{
                  bgcolor: color.headings,
                  height: 50,
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                      width: "8%",
                    }}
                  >
                    S.no
                  </TableCell>

                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                      width: "18%",
                    }}
                  >
                    Employee
                  </TableCell>

                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                      width: "12%",
                    }}
                  >
                    Role
                  </TableCell>

                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                      width: "12%",
                    }}
                  >
                    Salary
                  </TableCell>

                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                      width: "18%",
                    }}
                  >
                    Address
                  </TableCell>

                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                      width: "20%",
                    }}
                  >
                    Email
                  </TableCell>

                  <TableCell
                    sx={{
                      color: color.text,
                      fontSize: Theme.font16Bold,
                      width: "12%",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>

            {/* ================= VIRTUALIZED BODY ================= */}

            {filteredData.length === 0 ? (
              <Table>
                <TableBody>
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
                      No Employees Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
               <List
    style={{
      height: 180,
      width: "100%",
    }}
    rowCount={filteredData.length}
    rowHeight={60}
    rowComponent={VirtualizedRow}
    rowProps={{}}
  />
            )}
          </TableContainer>
        </Box>
      )}

      {/* ================= DELETE DIALOG ================= */}

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
      >
        <DialogTitle>
          Delete Employee
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this
            employee?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <CommonButton
            onClick={handleCloseDelete}
          >
            Cancel
          </CommonButton>

          <CommonButton
            onClick={handleConfirmDelete}
            sx={{
              backgroundColor: "red",
              color: "#fff",
            }}
          >
            Delete
          </CommonButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default memo(EmployeeTable);