import React, { useEffect, useState } from "react";
import Header from "../../components/utils/Header/Header.jsx";
import MuiLink from "@mui/material/Link";
import { Link} from "react-router-dom";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import requests from "./../../apis/users/requests"
import { tokens } from "../../antiontheme.js";
import { useSelector } from "react-redux";
const Profile = () => {
  const theme = useTheme();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const colors = tokens(theme.palette.mode);
  const [user, setuser] = useState({});
  const avatarStyle = {
    width: "100%",
    height: 150,
    borderRadius:"10px"
  };

  useEffect(() => {
    const Fetchuser = async () => {
      const response = await requests.getprofile();
      console.log(response.user);
      setuser(response.user)
    };
    Fetchuser();

  }, []);
  return (
    <Box m="20px">
                      <MuiLink
                  component={Link}
                  to={`/home`}
                  underline="none"
                  color="inherit"
                >
 <Header title="PROFILE" subtitle="Profile Page" />
                </MuiLink>
     
      <Paper
        sx={{
          maxWidth: "90%",
          m: "1px auto",
          p: "10px",
          borderRadius: "20px",
          boxShadow: 3,
        }}
      >
        <Box>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item xs={12} sx={{ marginBottom: "25px" }}>
              <Box
                component="img"
                style={avatarStyle}
                alt="The house from the offer."
                src={user.Coverpic ? user.Coverpic :PF+`person/noCover.png`}
              />
            </Grid>
            <Grid item>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <PieChartOutlineOutlinedIcon sx={{ mr: "10px" }} />
                <MuiLink
                  component={Link}
                  to={`/updateProfile/${user._id}`}
                  variant="button"
                  underline="none"
                  color="inherit"
                >
                  Update-Profile
                </MuiLink>
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <TimelineOutlinedIcon sx={{ mr: "10px" }} />
                <MuiLink
                  component={Link}
                  to={`/reset-password`}
                  variant="button"
                  underline="none"
                  color="inherit"
                >
                  Reset-password
                </MuiLink>
              </Button>
            </Grid>

          </Grid>
        </Box>

        <Box>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: "30px" }}
          >
            <Grid item xs={4}>
              <Box
                component="img"
                style={avatarStyle}
                alt="The house from the offer."
                src={user.Profilepic? user.Profilepic :PF+`person/noAvatar.png`}
                sx={{ marginTop: "50px" }}
              />
            </Grid>
            <Grid item xs={7}>
              <Box>
                <Grid align="center">
                  <Typography variant="h1" gutterBottom sx={{textTransform:"uppercase", color:colors.greenAccent[500],marginBottom:"20px"}} >
                    {user.username}
                  </Typography>
                </Grid>

                <Box>
                  <Grid
                    container
                    justifyContent="space-around"
                    alignItems="center"
                  >

<Grid item xs={12} sx={{marginBottom:"30px"}} >


  <Typography variant="h3" gutterBottom >
    <Box component="span" sx={{  color:colors.blueAccent[400]}}> Email :</Box>
    {user.email}
                  </Typography>
</Grid>
<Grid item xs={6}>


  <Typography variant="h3" gutterBottom>
  <Box component="span" sx={{marginRight:"10px" , color:colors.blueAccent[400]}}>  Role: </Box>
  {user.role}
                  </Typography>
</Grid>

<Grid item xs={6}>


  <Typography variant="h3" gutterBottom>
  <Box component="span" sx={{marginRight:"10px" , color:colors.blueAccent[400]}}>  Gender:</Box>
   {user.gender}
                  </Typography>
</Grid>
<Grid item xs={6} sx={{marginTop:"30px"}}>


  <Typography variant="h3" gutterBottom>
  <Box component="span" sx={{marginRight:"10px" , color:colors.blueAccent[400]}}>  Status: </Box>
   {user.status}
                  </Typography>

</Grid>

<Grid item xs={6} sx={{marginTop:"30px"}}>
<Typography variant="h3" gutterBottom >
  <Box component="span" sx={{marginRight:"10px" , color:colors.blueAccent[400]}}>  Age: </Box>
   {user.age ? user.age  : "12 YearsOld"}
                  </Typography>

</Grid>
<Grid item xs={6} sx={{marginTop:"30px"}}>
<Typography variant="h3" gutterBottom >
  <Box component="span" sx={{marginRight:"10px" , color:colors.blueAccent[400]}}>  Phone: </Box>
   {user.phone ? user.phone : "noPhone"}
                  </Typography>

</Grid>
<Grid item xs={6} sx={{marginTop:"30px"}}>
<Typography variant="h3" gutterBottom >
  <Box component="span" sx={{marginRight:"10px" , color:colors.blueAccent[400]}}>  FirstName: </Box>
   {user.FirstName }
                  </Typography>

</Grid>
<Grid item xs={6} sx={{marginTop:"30px"}}>
<Typography variant="h3" gutterBottom >
  <Box component="span" sx={{marginRight:"10px" , color:colors.blueAccent[400]}}>  Location: </Box>
   {user.location}
                  </Typography>

</Grid>
<Grid item xs={6} sx={{marginTop:"30px"}}>
<Typography variant="h3" gutterBottom >
  <Box component="span" sx={{marginRight:"10px" , color:colors.blueAccent[400]}}>  LastName: </Box>
   {user.LastName}
                  </Typography>

</Grid>
<Grid item xs={6} sx={{marginTop:"30px"}}>
<Typography variant="h3" gutterBottom >
  <Box component="span" sx={{marginRight:"10px" , color:colors.blueAccent[400]}}>  Occupation: </Box>
   {user.occupation}
                  </Typography>

</Grid>


                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
