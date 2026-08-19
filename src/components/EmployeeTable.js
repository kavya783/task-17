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
  darkMode,
}) {
  const isMobile = useMediaQuery("(max-width:500px)");

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const color = Colors(darkMode);

  
  const employeeData = Array.isArray(data) ? data : [];

  const filteredData = employeeData.filter(
    (item) => item?.role?.toLowerCase() !== "hr"
  );

  const getProfileImage = (item) => {
    return (
      item?.profile_image_url ||
      item?.profileImage ||
      "https://via.placeholder.com/60"
    );
  };

  
  const handleOpenDelete = (id) => {
    if (!id) {
      console.error("Employee ID is missing:", id);
      return;
    }

    setSelectedId(id);
    setOpenDelete(true);
  };

 
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedId(null);
  };

  
  const handleConfirmDelete = async () => {
    if (!selectedId) {
      return;
    }

    try {
      
      await handleDelete(selectedId);

      handleCloseDelete();
    } catch (error) {
      console.error("Delete employee error:", error);
    }
  };

  return (
    <>
     
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
                  {/* Profile Image */}

                  <Box
                    sx={{
                      textAlign: "center",
                      mb: 1,
                    }}
                  >
                    <img
                      src={getProfileImage(item)}
                      alt="profile"
                      width="80"
                      height="80"
                      loading="lazy"
                      decoding="async"
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
                    Name: {item.employeename || item.name}
                  </Typography>

                  

                  <Typography
                    sx={{
                      color: color.card,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Role: {item.role}
                  </Typography>

                  {/* Salary */}

                  <Typography
                    sx={{
                      color: color.card,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Salary: {item.salary}
                  </Typography>

                  {/* Address */}

                  <Typography
                    sx={{
                      color: color.card,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Address: {item.address}
                  </Typography>

                  {/* Email */}

                  <Typography
                    sx={{
                      color: color.card,
                      fontSize: Theme.font16Bold,
                    }}
                  >
                    Email: {item.email}
                  </Typography>

                  {/* Actions */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    {/* View */}

                    <Tooltip title="View">
                      <VisibilityIcon
                        sx={{
                          fontSize: 24,
                          color: color.card,
                          cursor: "pointer",
                        }}
                        onClick={() => handleView(item)}
                      />
                    </Tooltip>

                    {/* Edit */}

                    <Tooltip title="Edit">
                      <EditIcon
                        sx={{
                          fontSize: 24,
                          color: color.card,
                          cursor: "pointer",
                        }}
                        onClick={() => handleEdit(item)}
                      />
                    </Tooltip>

                    {/* Delete */}

                    <Tooltip title="Delete">
                      <DeleteIcon
                        sx={{
                          fontSize: 24,
                          color: color.card,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleOpenDelete(item.id)
                        }
                      />
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      ) : (
       

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
           component={Paper}
            sx={{
              mx: "auto",
              overflowX: "auto",
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
              

              <TableHead
                sx={{
                  bgcolor: color.headings,
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

             

              <TableBody>
                {filteredData.length === 0 ? (
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
                ) : (
                  filteredData.map((item, index) => (
                    <TableRow key={item.id}>
                    

                      <TableCell
                        sx={{
                          color: color.text,
                        }}
                      >
                        {index + 1}
                      </TableCell>

                     

                      <TableCell
                        sx={{
                          color: color.text,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={getProfileImage(item)}
                            alt="profile"
                            width="40"
                            height="40"
                            loading="lazy"
                            decoding="async"
                            style={{
                              width: 40,
                              height: 40,
                              minWidth: 40,
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />

                          <Typography
                            sx={{
                              color: color.text,
                              fontSize: Theme.font14,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.employeename || item.name}
                          </Typography>
                        </Box>
                      </TableCell>

                      

                      <TableCell
                        sx={{
                          color: color.text,
                        }}
                      >
                        {item.role}
                      </TableCell>

                      

                      <TableCell
                        sx={{
                          color: color.text,
                        }}
                      >
                        {item.salary}
                      </TableCell>

                     

                      <TableCell
                        sx={{
                          color: color.text,
                        }}
                      >
                        <Tooltip title={item.address || ""}>
                          <Typography
                            sx={{
                              color: color.text,
                              fontSize: Theme.font14,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.address}
                          </Typography>
                        </Tooltip>
                      </TableCell>

                      

                      <TableCell
                        sx={{
                          color: color.text,
                        }}
                      >
                        <Tooltip title={item.email || ""}>
                          <Typography
                            sx={{
                              color: color.text,
                              fontSize: Theme.font14,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.email}
                          </Typography>
                        </Tooltip>
                      </TableCell>

                     

                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {/* View */}

                          <Tooltip title="View">
                            <VisibilityIcon
                              sx={{
                                fontSize: 20,
                                color: color.text,
                                cursor: "pointer",
                              }}
                              onClick={() => handleView(item)}
                            />
                          </Tooltip>

                          {/* Edit */}

                          <Tooltip title="Edit">
                            <EditIcon
                              sx={{
                                fontSize: 20,
                                color: color.text,
                                cursor: "pointer",
                              }}
                              onClick={() => handleEdit(item)}
                            />
                          </Tooltip>

                          {/* Delete */}

                          <Tooltip title="Delete">
                            <DeleteIcon
                              sx={{
                                fontSize: 20,
                                color: color.text,
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleOpenDelete(item.id)
                              }
                            />
                          </Tooltip>
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



      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
      >
        <DialogTitle>
          Delete Employee
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <CommonButton onClick={handleCloseDelete}>
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