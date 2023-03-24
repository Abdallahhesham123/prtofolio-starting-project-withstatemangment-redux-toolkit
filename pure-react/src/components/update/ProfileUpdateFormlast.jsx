import React, { useContext, useEffect, useState } from 'react'
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import { useNavigate } from 'react-router-dom';
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CancelIcon from '@mui/icons-material/Cancel';
import validate from "../validation/user.js";
import requests from "../../apis/users/requests.js"
import axios from "axios";
import { Box, Button, Grid, Paper, useTheme } from "@mui/material";
import { tokens } from "../../antiontheme.js";
import { useSelector } from 'react-redux';
const useStyles = makeStyles({
  root: {
    maxWidth: "90%",
  },

  rootnotsm: {
    margin: "1rem auto",
  },

  rootsm: {
    margin: "3rem auto",
    maxWidth: "100%",
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
  img:{
    width:"10%",
    height:"10%",
  }
});
const Input = styled("input")({
  display: "none",
});
const genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];
const Status = [
  {
    value: "Online",
    label: "Online",
  },
  {
    value: "Offline",
    label: "Offline",
  },
];
const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
];

const ProfileUpdateForm = (props) => {
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const colors = tokens(theme.palette.mode);
    const { UserData } = props;
    const avatarStyle = {
      width: "100%",
      height: 150,
      borderRadius:"10px",
      position: "relative"
    };
    const classes = useStyles(props);
    // const { Userdata } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [Avatar, setAvatar] = useState(null);
    const fetchedUser = UserData || {};
    const [values, setValues] = useState({
      username: fetchedUser.username || "",
      email: fetchedUser.email || "",
      age: fetchedUser.age || "",
      gender: fetchedUser.gender || "",
      status: fetchedUser.status || "",
      FirstName:fetchedUser.FirstName || "",
      LastName:fetchedUser.LastName || "",
      phone:fetchedUser.phone || "",
      Profilepic:fetchedUser.Profilepic || "",
      // Coverpic :fetchedUser.Coverpic || "",
    });


    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
     const [ValidationStatus, setValidationStatus] = useState(false);
     const [submitted, setSubmitted] = useState(false);
     const [notification, setNotification] = useState({
      show:false,
      type:"warning",
      text:""
     });
     const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };
    const handleSubmit = async(e) => {
      e.preventDefault();
  
      setSubmitted(true)
  
      //validation-start-frontend
            const username = values.username ? values.username.trim() : values.username;
            
            const age = values.age 
            const FirstName = values.FirstName ? values.FirstName.trim() : values.FirstName;
            const LastName = values.LastName ? values.LastName.trim() : values.LastName;
            const phone = values.phone 
            const validationErrors = validate(username, age ,FirstName,LastName ,phone);
            // console.log(validationErrors);
            setErrors(validationErrors);
            let validStatus = Object.values(validationErrors).every((x)=> x === "")
            if(validStatus){
            setValidationStatus(true);
            }else{
            setValidationStatus(false);
            }
            // validation-end-frontend
      // send values to back end
      // calling the api
    };
    let goToHome = () => {
    
      setTimeout(() => {
        navigate("/profile", { replace: true });
      }, 2000);
    };
    useEffect(()=>{
  
  const sendPost= async(dataToSend)=>{
    // if (file) {

    //   const data = new FormData();
    //   const fileName = Date.now() + file.name;
    //   data.append("name", fileName);
    //   data.append("image", file);//("file" in app .router )
    //   values.Coverpic = `user/cover/${fileName}`;
    //   try {
    //     await axios.post("/user", data);
    //   } catch (err) {}
    // }
    if (Avatar) {

      const data = new FormData();
      const fileName = Date.now() + Avatar.name;
      data.append("name", fileName);
      data.append("image", Avatar);
      values.Profilepic = `user/profile/${fileName}`;
      try {
        await axios.put("/user/findByIdAndUpdate", data);
      } catch (err) {}
    }
    
    
    const response = await fetch(`http://localhost:5000/user/findByIdAndUpdate`, {
      method: "PUT",
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dataToSend),
    });

    const data = await response.json();
    console.log(data);
    // if(response.ok){
    //   if(data){
    //     const err = data.message || {}
    
    //     if(err ){

    //       setNotification({
  
    //         show:true,
    //         type: 'success',
    //         text:"Congratulation ,the post has been successfully updated"
    //       })
    //       goToHome();
    //     }
    //   }
 
    // }else if(data){
    //   const err = data.message || {}
  
    //   if(err ){
    //     setNotification({
  
    //       show:true,
    //       type: 'warning',
    //       text:err.message
    //     })
  
    //   }
  
    // }else{
    //   setNotification({
  
    //     show:true,
    //     type: 'error',
    //     text:"unknownerror"
    //   })
      
    // }
  
  }
  try {
  if (submitted) {
    if(ValidationStatus){ 
      

      console.log(values);
      //for frontend before backend
          sendPost(values ,token)
          setValidationStatus(false)
        }
    setSubmitted(false)
  }
  
     
    // validation-start-frontend
  
    // validation-end-frontend
  } catch (error) {
  
    console.log(error);
    
  }
      
    },[submitted])
  return (
    <>
    <Box>

    <Grid container justifyContent="space-between" alignItems="center">

            <Grid item xs={12}>
            <Paper
        sx={{
          maxWidth: "100%",
          m: "1px auto",
          p: "10px",
          borderRadius: "20px",
          boxShadow: 3,
          backgroundColor: "rgba(0, 0, 0,0.1)"
        }}
      >
                {file ? (
          <div className="shareImgContainer">
            {/* <img className={classes.img} src={URL.createObjectURL(file)} alt="" /> */}
            <Box
          component="img"
          style={avatarStyle}
          alt="The house from the offer."
          src={URL.createObjectURL(file)}
        />
            <CancelIcon className="shareCancelImg"  onClick={() => setFile(null)} />
          </div>
        ):(


          <Box
          component="img"
          style={avatarStyle}
          alt="The house from the offer."
          src={values?.Coverpic ? PF+values.Coverpic :PF+`person/noCover.png`}
        />
        )}
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid
                  item
                  sx={{
                    margin: "30px",
                    // borderRadius: "50%",
                    border: "2px solid #fff",
                    padding: "20px",
                  }}
                  // xs={12}
                >
                  <label htmlFor="icon-button-file" justifyContent="center" >
                    <Input 
                    id="icon-button-file" 
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                    />
                    CoverPicture
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      
                    >
                      <PhotoCamera sx={{color:colors.greenAccent[100]}} />
                    </IconButton>
                  </label>
                </Grid>
                <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
                <Grid item sx={{ gridColumn: "span 2"  }} >
                  <TextField
                      sx={{ mb: 1 }}
                    label="Name"
                    name="username"
                    value={values.username}
                    onChange={handleInputChange}
                    error={!!errors.username}
                    helperText={errors.username && errors.username}
                    fullWidth
                  />
                </Grid>
                <Grid item sx={{ gridColumn: "span 2"  }}>
                  <TextField
                    sx={{ mb: 1 }}
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email && errors.email}
                    fullWidth
                    disabled
                  />
                </Grid>

                <Grid item  sx={{ gridColumn: "span 1"  }}>
                  <TextField 
                  label="Age"
                  name="age"
                  value={values.age}
                  onChange={handleInputChange}
                  error={!!errors.age}
                  helperText={errors.age && errors.age}
                   fullWidth />
                </Grid>

                <Grid item sx={{ gridColumn: "span 1 "  }}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Gender"
                      name='gender'
                      value={values.gender}
                      onChange={handleInputChange}
                      fullWidth
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item  sx={{ gridColumn: "span 1"  }}>
                  <TextField 
                  label="Phone"
                  type="number"
                  name="phone"
                  value={values.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone}
                  helperText={errors.phone && errors.phone}
                   fullWidth />
                </Grid>
                <Grid item sx={{ gridColumn: "span 1"  }}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Status"
                      name='status'
                      value={values.status}
                      onChange={handleInputChange}
                      fullWidth
                    >
                      {Status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                <Grid item  sx={{ gridColumn: "span 2"  }}>
                  <TextField 
                  label="FirstName"
                  type="text"
                  name="FirstName"
                  value={values.FirstName}
                  onChange={handleInputChange}
                  error={!!errors.FirstName}
                  helperText={errors.phone && errors.FirstName}
                   fullWidth />
                </Grid>
                <Grid item  sx={{ gridColumn: "span 2"  }}>
                  <TextField 
                  label="LastName"
                  type="text"
                  name="LastName"
                  value={values.LastName}
                  onChange={handleInputChange}
                  error={!!errors.LastName}
                  helperText={errors.LastName && errors.LastName}
                   fullWidth />
                </Grid>



                  <Grid
                  item
                  sx={{
                    margin: "30px",
                    gridColumn: "span 2" ,
                    // border: "1px solid #fff",
                    padding: "20px",
                  }}
                 
                >
                  <label htmlFor="icon-button-file2" >
                    <Input 
                    id="icon-button-file2" 
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    // justifyContent="center" alignItems="center"
                    />
                    ProfilePicture
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      justifyContent="center"
                      
                      
                    >
                      <PhotoCamera sx={{color:colors.greenAccent[100]}} />
                    </IconButton>
                  </label>
                </Grid>
                <Grid
                  item
                  sx={{
                    margin: "30px",
                    gridColumn: "span 2" ,
                    border: "2px solid #fff",
                    padding: "20px",
                  }}
                 
                >


{Avatar ? (
          <div className="shareImgContainer">
            {/* <img className={classes.img} src={URL.createObjectURL(file)} alt="" /> */}
            <Box
          component="img"
          style={avatarStyle}
          alt="The house from the offer."
          src={URL.createObjectURL(Avatar)}
        />
            <CancelIcon className="shareCancelImg"  onClick={() => setAvatar(null)} />
          </div>
        ):(


          <Box
          component="img"
          style={avatarStyle}
          alt="The house from the offer."
          src={values?.Profilepic ? PF+values.Profilepic :PF+`person/noCover.png`}
        />
        )}

                </Grid>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="error"
                  sx={{ margin: "20px" }}
                >
                  Submit
                </Button>
              </Grid>
            </form>

      </Paper>
            </Grid>
    </Grid>
    </Box>

    
    
    </>
  )
}

export default ProfileUpdateForm