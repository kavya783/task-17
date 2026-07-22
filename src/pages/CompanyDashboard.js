import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Typography
} from "@mui/material";
import CommonButton from "../components/CommonButton";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";
import AppBarr from "../components/appBar";
import HrTable from "../components/HrTable";
import HrForm from "../components/HrForm";
import { addHRDataActionInitiate } from "../redux/actions/addHRAction";
import { getHRDataActionInitiate } from "../redux/actions/getHRAction";
import { updateHRDataActionInitiate } from "../redux/actions/updateHRAction";
import { deleteHRDataActionInitiate } from "../redux/actions/deleteHRAction";
import { toast } from "react-toastify";
function CompanyDashboard({
  darkMode,
  setDarkMode,
  themeColor,
  setThemeColor,
}) {
  const color = Colors(darkMode);
  const [viewHR, setViewHR] = useState(null);
  const dispatch = useDispatch();


  const { hrs = [] } = useSelector(
    (state) => state.gethrdata || {}
  );
  const hrData = hrs;
  console.log("HR DATA", hrData);
 const initialHR = {
    id: "",
    name: "",
    email: "",
    password: "",
    address: "",
    role: "hr",
    profileImageFile: null,
    profile_image_url: ""
};
  const [showHRs, setShowHRs] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("add");
  const [hr, setHr] = useState(initialHR);
  useEffect(() => {
    dispatch(
      getHRDataActionInitiate()
    );
  }, [dispatch]);
  // ADD HR
  const handleAdd = () => {
   setType("add");
    setHr(initialHR);
    setShowForm(true);
  };
  // EDIT HR
  const handleEdit = (item) => {
    setType("edit");
    setHr({
      ...item,
      password: ""
    });
    setShowForm(true);
  };
  const handleView = (item) => {
    setViewHR(item);

  };
  // DELETE HR
  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete HR?"
      );
    if (confirmDelete) {
      try {
        await dispatch(
          deleteHRDataActionInitiate(id)
        );
                dispatch(
          getHRDataActionInitiate()
        );
                toast.success(
          "HR deleted successfully"
        );
      }
      catch (error) {
        toast.error(
          "Delete failed"
        );
      }

    }
    };
  const handleChange = (e) => {
    setHr({
      ...hr,
      [e.target.name]: e.target.value
    });
  };
  const submitHandle = async ({ formData, id }) => {
    console.log([...formData.entries()]);
    try {
      if (type === "add") {
        await dispatch(
          addHRDataActionInitiate(formData)
        );
        toast.success("HR added successfully");
      } else {
        await dispatch(
          updateHRDataActionInitiate(
            id,
            formData
          )
        );
      }
      dispatch(
        getHRDataActionInitiate()
      );

      setShowForm(false);
      setHr(initialHR);
    } catch (error) {
      toast.error(
        "Something went wrong"
      );

    }

  };
  return (
    <>
       <AppBarr
        roled="company"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        setShowHRs={setShowHRs}
      />
      <Box
        sx={{
          p: 2,
          background: color.background,
          // height: { xs: "500px", sm: "830px", md: "1300px", lg: "1400px", xl: "697px" },
          minHeight:{xs:"100vh",xl:"697px"}
        }}
      >
        {showHRs && (
          <HrTable
            data={hrData}
            darkMode={darkMode}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleView={handleView}
          />
        )}
        {viewHR && (

          <Dialog
            open={Boolean(viewHR)}
            onClose={() => setViewHR(null)}
            maxWidth="xs"
            fullWidth
          >

            <DialogTitle
              sx={{
                textAlign: "center",
                fontSize: Theme.font20Bold,
                bgcolor: color.navbar,
                color: color.text
              }}
            >
              HR Details
            </DialogTitle>
            <DialogContent sx={{ p: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3
                }}
              >
                <Avatar
                  src={viewHR.profile_image_url || ""}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: color.headings
                  }}

                >
                    {
                    viewHR.name?.charAt(0).toUpperCase()
                  }
                </Avatar>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    borderBottom: "1px solid #ddd",
                    pb: 1
                  }}
                >
                  <Typography sx={{ fontSize: Theme.font16Bold }}>
                    Name:
                  </Typography>
                  <Typography>
                    {viewHR.name}
                  </Typography>

                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    borderBottom: "1px solid #ddd",
                    pb: 1
                  }}
                >
                  <Typography sx={{ fontSize: Theme.font16Bold }}>
                    Email:
                  </Typography>

                  <Typography>
                    {viewHR.email}
                  </Typography>

                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    borderBottom: "1px solid #ddd",
                    pb: 1
                  }}
                >
                  
                  <Typography sx={{ fontSize: Theme.font16Bold }}>
                    Address:
                  </Typography>

                  <Typography>
                    {viewHR.address}
                  </Typography>

                </Box>



              </Box>


            </DialogContent>


            <DialogActions
              sx={{
                justifyContent: "center",
                pb: 3
              }}
            >

              <CommonButton
                onClick={() => setViewHR(null)}
                sx={{
                  bgcolor: color.navbar,
                  color: color.text
                }}
              >

                Close

              </CommonButton>


            </DialogActions>


          </Dialog>

        )}



        {type !== "view" && (

          <HrForm
            darkMode={darkMode}
            hr={hr}
            handleChange={handleChange}
            submitHandle={submitHandle}
            show={showForm}
            handleClose={() => {
              setShowForm(false);
              setHr(initialHR);
            }}
            type={type}
          />

        )}

      </Box>
    </>

  )


}


export default CompanyDashboard;