import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getHRDataActionInitiate } from "../redux/actions/getHRAction";

import Colors from "../colors";
import { Theme } from "../GlobalStyles";
import CommonButton from "./CommonButton";


function HRHome({ darkMode }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const color = Colors(darkMode);


  const {
    hrs = [],
    data = [],
    loading,
    error
  } = useSelector(
    (state) => state.gethrdata || {}
  );


  const email = localStorage.getItem("email") || "";
  const hrList = Array.isArray(hrs) ? hrs : Array.isArray(data) ? data : [];


  useEffect(() => {

    dispatch(getHRDataActionInitiate());

  }, [dispatch]);



  const hr = hrList.find((item) => item.email === email);



  if(loading){

    return(
      <Typography sx={{textAlign:"center",mt:20 }}>
        Loading...
      </Typography>
    )

  }



  if(error){

    return(
      <Typography sx={{textAlign:"center",mt:5,color:"red"}}>
        {error}
      </Typography>
    )

  }



  if(!hr){

    return(
      <Typography sx={{textAlign:"center",mt:5}}>
        HR not found
      </Typography>
    )

  }



  return (

    <Box
      sx={{
        display:"flex",
        justifyContent:"center",
        mt:5,
        p:0
      }}
    >


      <Card

        sx={{
          width:"100%",
          maxWidth:350,
          borderRadius:7,
          boxShadow:"0px 10px 15px rgba(0,0,0,0.1)",

          transition:"0.3s",
            mt:10,
          "&:hover":{
            transform:"translateY(-5px)"
          }

        }}

      >


        <CardContent>



          <Avatar

            src={hr.profile_image_url}

            alt={hr.name}

            sx={{

              width: { xs: 60, sm: 90 },
              height: { xs: 60, sm: 90 },
              margin:"0 auto",
              mb:1

            }}

          />



          <Typography

            variant="h6"

            sx={{
              textAlign:"center",
              ...Theme.font24Bold,
              color:color.card,
               borderColor: '#000000',
              borderWidth: '2px'
            }}

          >

            {hr.name}

          </Typography>



          <Divider sx={{mb:2}} />



          <Stack spacing={2}>


            <Box
              sx={{
                display:"flex",
                alignItems:"center",
                gap:1
              }}
            >

              <EmailIcon sx={{color:color.card}} />

              <Typography
                sx={{
                  color:color.card,
                  ...Theme.font16SemiBold
                }}
              >

                {hr.email}

              </Typography>

            </Box>




            <Box
              sx={{
                display:"flex",
                alignItems:"center",
                gap:1
              }}
            >

              <WorkIcon sx={{color:color.card}} />

              <Typography
                sx={{
                  color:color.card,
                  ...Theme.font16SemiBold
                }}
              >

                {hr.role}

              </Typography>

            </Box>




            <Box
              sx={{
                display:"flex",
                alignItems:"center",
                gap:1
              }}
            >

              <HomeIcon sx={{color:color.card}} />

              <Typography
                sx={{
                  color:color.card,
                  ...Theme.font16SemiBold
                }}
              >

                {hr.address}

              </Typography>

            </Box>


          </Stack>



          <Divider sx={{mt:2,mb:2}} />



          <CommonButton

            fullWidth

            onClick={()=>navigate("/leave/form")}

            sx={{

              borderRadius:"30px",

              ...Theme.font16Bold,

              bgcolor:color.navbar,

              color:color.text,


              "&:hover":{

                bgcolor:color.border

              }

            }}

          >

            Apply Leave

          </CommonButton>



        </CardContent>


      </Card>


    </Box>


  )

}


export default HRHome;