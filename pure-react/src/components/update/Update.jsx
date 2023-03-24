import React, { useEffect, useState } from 'react'
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box,  Grid, Paper,  useTheme } from "@mui/material";
import Header from "../utils/Header/Header.jsx";
import ProfileUpdateForm from "./ProfileUpdateForm"
import { useSelector } from 'react-redux';
import MuiLink from "@mui/material/Link";
import { Link} from "react-router-dom";
const useStyles = makeStyles({
    root: {
      width: "90% !important",
      margin:"10px auto",
     
    },
  
    rootnotsm: {
      margin: "1rem auto",
    },
  
    rootsm: {
      margin: "3rem auto",
      width: "100%",
    },
  
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    body: {
      textAlign: "center",
    },
    image: {
      maxWidth: "80% !important",
      height: "50% !important",
      margin: "auto",
      border: "1px solid red",
      //    marginTop:'30'
    },
    select: {
      display: "flex",
      justifyContent: "space-around",
    },
  });
const Update = (props) => {
    // const token = useSelector((state) => state.token);
    const classes = useStyles(props);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const [user, setUser] = useState(undefined);
    useEffect(() => {
      const Fetchuser = async () => {
        const response = await fetch(`http://localhost:5000/user/getProfile`, {
          method: "GET",
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
         
        });
        const data = await response.json();
        console.log(data.user)
        setUser(data.user)
      };
      Fetchuser();
  
    }, []);
  return (
    <Box m="20px" sx={{ width:"100%"}}>

<MuiLink
                  component={Link}
                  to={`/home`}
                  underline="none"
                  color="inherit"
                >
    <Header title="Update-Profile" subtitle="Update Profile Page" />
                </MuiLink>

    <Paper
      sx={{
       maxWidth: "100% !important",
        m: "10px auto",
        p: "10px",
        borderRadius: "20px",
        boxShadow: 3,
        
      }}
    >
         <Grid
          container
          direction={matches ? "column" : "row"}

          sx={{width: "90%", m: "10px auto"}}
          justifyContent="center"
        >
          {user && <ProfileUpdateForm UserData={user} />}
        </Grid>
        </Paper>
        </Box>
  )
}

export default Update