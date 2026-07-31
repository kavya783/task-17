import React, { useState, useEffect } from "react";

import {
    TextField,
    Box,
    IconButton,
    Typography,
    Modal,
    Paper,
    Avatar
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import CommonButton from "./CommonButton";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";
import { toast } from "react-toastify";


export default function HrForm({
    darkMode,
    hr = {},
    handleChange,
    submitHandle,
    show,
    handleClose,
    type
}) {
    const [errors, setErrors] = useState({});
    const color = Colors(darkMode);
    const hrName = hr.name || "";
    const hrEmail = hr.email || "";
    const hrAddress = hr.address || "";
    const hrPassword = hr.password || "";
    const handleInputChange = (e) => {
        handleChange(e);
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };
    const validate = () => {
        let error = {};
        if (!hrName.trim()) {
            error.name = "Name is required";
        }
        if (!hrEmail.trim()) {
            error.email = "Email is required";
        }
        else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(hrEmail)
        ) {
            error.email = "Invalid email";
        }
        if (!hrAddress.trim()) {
            error.address = "Adddress is required";
        }
        if (type === "add") {
            if (!hrPassword) {
                error.password = "Password is required"
            }
            else if (hrPassword.length < 6) {
                error.password = "Minimum 6 characters required";
            }
        }
        if (type === "add" && !hr.profileImageFile) {
            error.profileImage = "Image is required";
        }
        setErrors(error);
        return Object.keys(error).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const formData = new FormData();
       formData.append("name", hrName);
formData.append("email", hrEmail);
formData.append("address", hrAddress);
formData.append("password", hrPassword);   
formData.append("role", "hr");

if (hr.profileImageFile) {
    formData.append("profile_image", hr.profileImageFile);
}
        submitHandle({
            formData,
            id: hr.id

        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;
        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png"
        ) {

            toast.error("Only JPG and PNG allowed");
            return;

        }
        if (file.size > 2 * 1024 * 1024) {

            toast.error("Image size should be less than 2MB");
            return;
        }
        handleChange({

            target: {
                name: "profileImageFile",
                value: file
            }

        });


    };
    useEffect(() => {
        if (show) {

            setErrors({});


        }
    }, [show]);

    return (

        <Modal
            open={show}
            onClose={handleClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Paper
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",

                    width: {
                        xs: "80%",
                        sm: "70%",
                        md: "45%",
                        lg: "35%"
                    },

                    maxHeight: "90vh",
                    overflowY: "auto",

                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },

                    borderRadius: 3
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: Theme.font20Bold
                        }}
                    >
                        {
                            type === "add"
                                ?
                                "Add HR"
                                :
                                type === "edit"
                                    ?
                                    "Edit HR"
                                    :
                                    "HR Details"
                        }
                    </Typography>
                    <IconButton onClick={handleClose}>

                        <CloseIcon />

                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 3
                    }}
                >
                    <Box sx={{ position: "relative" }}>
                        <Avatar
                            src={
                                hr.profileImageFile
                                    ? URL.createObjectURL(hr.profileImageFile)
                                    : hr.profile_image_url || ""
                            }
                            sx={{
                                width: {
                                    xs: 80,
                                    sm: 100
                                },
                                height: {
                                    xs: 80,
                                    sm: 100
                                },
                                border: "4px solid #1976d2",
                                boxShadow: 4,
                            }}
                        >
                            {
                                !hr.profile_image_url &&
                                !hr.profileImageFile &&
                                hrName.charAt(0).toUpperCase()
                            }

                        </Avatar>
                        <IconButton

                            component="label"
                            sx={{
                                position: "absolute",
                                right: 0,
                                bottom: 0,
                                bgcolor: color.headings
                            }}
                        >
                            <EditIcon />
                            <input
                                hidden
                                type="file"
                                accept="image/png,image/jpeg"
                                onChange={handleImageChange}
                            />
                        </IconButton>
                    </Box>
                </Box>
                {
                    errors.profileImage && (
                        <Typography
                            sx={{
                                color: "red",
                                textAlign: "center",
                                mb: 2
                            }}
                        >
                            {errors.profileImage}
                        </Typography>
                    )
                }
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="HR Name"
                        name="name"
                        value={hrName}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                        sx={{
                            mb: 2,
                            "& .MuiInputBase-root": {
                                fontSize: {
                                    xs: "14px",
                                    sm: "16px"
                                }
                            }
                        }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={hrEmail}
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                        sx={{
                            mb: 2,
                            "& .MuiInputBase-root": {
                                fontSize: {
                                    xs: "14px",
                                    sm: "16px"
                                }
                            }
                        }}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={hrAddress}
                        onChange={handleInputChange}
                        error={!!errors.address}
                        helperText={errors.address}
                        fullWidth
                        sx={{
                            mb: 2,
                            "& .MuiInputBase-root": {
                                fontSize: {
                                    xs: "14px",
                                    sm: "16px"
                                }
                            }
                        }}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={hrPassword}
                        onChange={handleInputChange}
                        error={!!errors.password}
                        helperText={
                            type === "edit"
                                ?
                                "Leave blank to keep password"
                                :
                                errors.password
                        }
                        fullWidth
                        sx={{
                            mb: 2,
                            "& .MuiInputBase-root": {
                                fontSize: {
                                    xs: "14px",
                                    sm: "16px"
                                }
                            }
                        }}

                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,

                            flexDirection: {
                                xs: "column",
                                sm: "row"
                            }
                        }}
                    >
                        <CommonButton

                            onClick={handleClose}
                            sx={{
                                bgcolor: color.navbar,
                                color: color.text,

                                width: {
                                    xs: "100%",
                                    sm: "auto"
                                }
                            }}
                        >

                            Cancel

                        </CommonButton>





                        {
                            type !== "view" &&


                            <CommonButton
                                type="submit"

                                sx={{

                                    bgcolor: color.navbar,

                                    color: color.text

                                }}

                            >


                                {

                                    type === "add"

                                        ?

                                        "Add HR"

                                        :

                                        "Update HR"

                                }



                            </CommonButton>


                        }





                    </Box>



                </form>



            </Paper>



        </Modal>


    );


}