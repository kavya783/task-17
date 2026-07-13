import React from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Box, Card, CardContent,
    Typography, useMediaQuery,
    Tooltip
} from "@mui/material";

import CommonButton from "./CommonButton";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EmployeeTable({
    data = [],
    handleEdit,
    handleDelete,
    handleAdd,
    handleView,
    page,
    rowsPerPage,
    darkMode

}) {

    const isMobile = useMediaQuery("(max-width:500px)");
    const filteredData = data.filter(item => item.role !== "hr");

   const color = Colors(darkMode, themeColor);
    const getProfileImage = (item) => item.profile_image_url || item.profileImage || "https://via.placeholder.com/60";

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, ml: { md: 31, lg: 35, xl: 38 }, mr: { lg: 28, xl: 26 }, mt: 15 }}>

                <Typography sx={{ mr: { xs: 3, sm: 55, md: 40, lg: 10, xl: 5 }, color: color.text, fontSize: Theme.font24Bold, display: { xs: "none", md: "block" }, }}>
                    Employee List:
                </Typography>
                <Typography sx={{ mr: { xs: 3, sm: 55, md: 40, lg: 10, xl: 5 }, color: color.text, fontSize: Theme.font16Bold, display: { xs: "block", md: "none" }, }}>
                    Employee List:
                </Typography>


                <CommonButton
                    variant="contained"
                    sx={{ color: color.text, backgroundColor: color.headings, ml: 3, fontSize: Theme.font12Bold, display: { xs: "block", md: "none" } }}
                    onClick={handleAdd}
                >
                    Add Employee
                </CommonButton>
                <CommonButton
                    variant="contained"
                    sx={{ color: color.text, backgroundColor: color.headings, ml: 3, fontSize: Theme.font16Bold, display: { xs: "none", md: "block" } }}
                    onClick={handleAdd}
                >
                    Add Employee
                </CommonButton>
            </Box>

            {isMobile ? (
                <Box>
                    {filteredData.map((item) => (
                        <Card
                            key={item.id}
                            sx={{
                                mb: 2,
                                boxShadow: `0px 4px 10px ${color.text}`,
                                color: color.text
                            }}
                        >
                            <CardContent>

                                <Box sx={{ textAlign: "center", mb: 1 }}>
                                    <img
                                        src={getProfileImage(item)}
                                        alt="profile"
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: "50%"
                                        }}
                                    />
                                </Box>

                                <Typography sx={{ color: color.card, fontSize: Theme.font16Bold }}>
                                    Name: {item.employeename}
                                </Typography>

                                <Typography sx={{  color: color.card, fontSize: Theme.font16Bold }}>Role: {item.role}</Typography>
                                <Typography sx={{  color: color.card, fontSize: Theme.font16Bold }}>Salary: {item.salary}</Typography>
                                <Typography sx={{ color: color.card, fontSize: Theme.font16Bold }}>Address: {item.address}</Typography>
                                <Typography sx={{  color: color.card, fontSize: Theme.font16Bold }}>Email: {item.email}</Typography>

                                <Box sx={{ display: "flex", gap: 10, mt: 2 }}>
                                    <span onClick={() => handleView(item)}>
                                        <VisibilityIcon sx={{ fontSize:Theme.font16Bold, color: color.card, ml: 2 }} />
                                    </span>
                                    <span onClick={() => handleEdit(item)}>
                                        <EditIcon sx={{ fontSize: 24, color: color.card }} />
                                    </span>
                                    <span onClick={() => handleDelete(item.id)}>
                                        <DeleteIcon sx={{ fontSize: 24, color: color.card }} />
                                    </span>
                                </Box>

                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (

                <Box sx={{ mt: 2, width: { lg: "66%" }, ml: { md: "25%", lg: "20%" } }}>
<TableContainer
  sx={{
    width: "100%",
    boxShadow: 2,
    borderRadius: 2,

    borderLeft: darkMode ? `1px solid ${color.border}` : "none",
    borderRight: darkMode ? `1px solid ${color.border}` : "none",
  
  }}
>
                        <Table size="small">

                            <TableHead sx={{ bgcolor: color.headings, height: 50 }}>
                                <TableRow>
                                    <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold }}>S.no</TableCell>
                                    <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold }}>Employee</TableCell>
                                    <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold }}>Role</TableCell>
                                    <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold }}>Salary</TableCell>
                                    <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold }}>Address</TableCell>
                                    <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold }}>Email</TableCell>
                                    <TableCell sx={{ color: color.text, fontSize: Theme.font16Bold }}>Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredData.map((item, index) => (
                                    <TableRow key={item.id}>

                                        <TableCell sx={{ color: color.text }}>
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>

                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <img
                                                    src={getProfileImage(item)}
                                                    alt="profile"
                                                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                                                />

                                                <Tooltip title={item.employeename} arrow>
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

                                        <TableCell sx={{ color: color.text,fontSize:Theme.font14Regular}}>{item.role}</TableCell>
                                        <TableCell sx={{ color: color.text,fontSize:Theme.font14Regular }}>{item.salary}</TableCell>
                                        <TableCell sx={{ color: color.text,fontSize:Theme.font14Regular }}>{item.address}</TableCell>
                                        <TableCell sx={{ color: color.text,fontSize:Theme.font14Regular }}>{item.email}</TableCell>

                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <span onClick={() => handleView(item)}>
                                                    <VisibilityIcon sx={{ fontSize: 18, color: color.text }} />
                                                </span>
                                                <span onClick={() => handleEdit(item)}>
                                                    <EditIcon sx={{ fontSize: 18, color: color.text }} />
                                                </span>
                                                <span onClick={() => handleDelete(item.id)}>
                                                    <DeleteIcon sx={{ fontSize: 18, color: color.text }} />
                                                </span>
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