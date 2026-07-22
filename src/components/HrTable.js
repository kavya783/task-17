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
    Tooltip
} from "@mui/material";

import CommonButton from "./CommonButton";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";

import { Avatar } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


export default function HrTable({
    data = [],
    handleEdit,
    handleDelete,
    handleAdd,
    handleView,
    darkMode
}) {


    const isMobile = useMediaQuery("(max-width:500px)");

    const color = Colors(darkMode);


    const filteredData = data.filter(
        (item) => item.role === "hr"
    );



    return (
        <>


            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    ml: { md: 31, lg: 35, xl: 38 },
                    mr: { lg: 28, xl: 26 },
                    mt: 15
                }}
            >


                <Typography
                    sx={{
                        color: color.text,
                        fontSize: Theme.font24Bold
                    }}
                >
                    HR List:
                </Typography>



                <CommonButton
                    variant="contained"
                    sx={{
                        color: color.text,
                        backgroundColor: color.headings,
                        fontSize: Theme.font16Bold

                    }}
                    onClick={handleAdd}
                >
                    Add HR
                </CommonButton>


            </Box>
            {isMobile ? (
                <Box>
                    {
                        filteredData.map((item) => (
                            <Card
                                key={item.id}
                                sx={{
                                    mb: 2,
                                    mx: 2
                                }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}
                                    >
                                        <img
                                            src={item.profile_image_url}
                                            alt="profile"
                                            style={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: "50%"
                                            }}
                                        />
                                    </Box>
                                    {/* <Avatar
                                            src={item.profile_image_url}
                                            sx={{
                                                width: 35,
                                                height: 35
                                            }}
                                        >
                                            {item.name?.charAt(0).toUpperCase()}
                                        </Avatar> */}


                                    <Typography sx={{ color: color.card, fontSize: Theme.font16Bold }}>
                                        Name:{item.name}
                                    </Typography>


                                    <Typography sx={{ color: color.card, fontSize: Theme.font16Bold }}>
                                        Email : {item.email}
                                    </Typography>
                                    <Typography sx={{ color: color.card, fontSize: Theme.font16Bold }}>
                                        Address : {item.address}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 9,
                                            mt: 2
                                        }}
                                    >
                                        <span onClick={() => handleView(item)}>
                                            <VisibilityIcon
                                                sx={{ fontSize: Theme.font24Bold, color: color.card, ml: 0 }}
                                            />
                                        </span>
                                        <span onClick={() => handleEdit(item)}>
                                            <EditIcon
                                                sx={{ fontSize: Theme.font24Bold, color: color.card, ml: 1 }}

                                            />
                                        </span>
                                        <span onClick={() => handleDelete(item.id)}>
                                            <DeleteIcon
                                                sx={{ fontSize: Theme.font24Bold, color: color.card, ml: 1 }}
                                            />
                                        </span>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))
                    }
                </Box>
            ) : (
                <Box
                    sx={{
                        mt: 2,
                        width: { lg: "66%" },
                        ml: { md: "25%", lg: "20%" }
                    }}
                >
                    <TableContainer
                        sx={{
                            boxShadow: 2,
                            borderRadius: 2,
                            borderRight: "1px solid white",
                             borderLeft: "1px solid white"
                        }}
                    >
                        <Table size="small">
                            <TableHead
                                sx={{
                                    bgcolor: color.headings
                                }}
                            >
                                <TableRow>
                                    <TableCell sx={{ color: color.text,fontSize:Theme.font16Bold }}>
                                        S.no
                                    </TableCell>

                                    <TableCell sx={{ color: color.text,fontSize:Theme.font16Bold  }}>
                                        Name
                                    </TableCell>
                                    <TableCell sx={{ color: color.text,fontSize:Theme.font16Bold  }}>
                                        Email
                                    </TableCell>
                                    <TableCell sx={{ color: color.text,fontSize:Theme.font16Bold  }}>
                                        Address
                                    </TableCell>
                                    <TableCell sx={{ color: color.text,fontSize:Theme.font16Bold  }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    filteredData.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell sx={{ color: color.text, fontSize: Theme.font14Regular }}>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,

                                                    }}
                                                >
                                                    <Avatar
                                                        src={item.profile_image_url}
                                                        sx={{
                                                            width: 35,
                                                            height: 35
                                                        }}
                                                    >
                                                        {item.name?.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                    <Tooltip title={item.name}>

                                                        <Typography
                                                            sx={{
                                                                color: color.text,
                                                                maxWidth: "120px",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap",
                                                                 fontSize: Theme.font14Regular
                                                            }}
                                                        >

                                                            {item.name}

                                                        </Typography>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ color: color.text, fontSize: Theme.font14Regular }}>
                                                {item.email}
                                            </TableCell>
                                            <TableCell sx={{ color: color.text, fontSize: Theme.font14Regular }}>
                                                {item.address}
                                            </TableCell>
                                            <TableCell>


                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 1
                                                    }}
                                                >


                                                    <span onClick={() => handleView(item)}>
                                                        <VisibilityIcon
                                                            sx={{ fontSize: Theme.font24Bold, color: color.text, ml: 0 }}
                                                        />
                                                    </span>



                                                    <span onClick={() => handleEdit(item)}>
                                                        <EditIcon
                                                            sx={{ fontSize: Theme.font24Bold, color: color.text, ml: 1 }}
                                                        />
                                                    </span>



                                                    <span onClick={() => handleDelete(item.id)}>
                                                        <DeleteIcon
                                                            sx={{ fontSize: Theme.font24Bold, color: color.text, ml: 1 }}
                                                        />
                                                    </span>



                                                </Box>


                                            </TableCell>




                                        </TableRow>


                                    ))

                                }



                            </TableBody>


                        </Table>


                    </TableContainer>


                </Box>


            )}



        </>
    )

}