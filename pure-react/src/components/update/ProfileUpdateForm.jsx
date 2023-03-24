import React, { useEffect } from 'react'
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Stack,
  Alert,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "../utils/FlexBetween";
const phoneRegExp = /[0-9]{11}/
const ProfileSchema = yup.object().shape({
    username: yup.string().min(3).max(20).required("required"),
    FirstName: yup.string().min(3).max(20).required("required"),
    LastName: yup.string().min(3).max(20).required("required"),
    location: yup.string().required("your location is required"),
    occupation: yup.string().required("your occupation isrequired"),
    age :yup.number().min(16).max(120).required("your age isrequired"),
    phone: yup.string().matches(phoneRegExp, 'Is not in correct format')
    .required("your phone is required"),
   
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
  
const ProfileUpdateForm = (props) => {
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const [submitted, setSubmitted] = useState(false);
    const { UserData } = props;
    const fetchedUser = UserData || {};
    const [formvalues, setformValues] = useState({
            FirstName:fetchedUser.FirstName|| "",
            LastName: fetchedUser.LastName|| "",
            username: fetchedUser.username|| "",
            email: fetchedUser.email|| "",
            location: fetchedUser.location|| "",
            occupation: fetchedUser.occupation|| "",
            age: fetchedUser.age|| "",
            gender: fetchedUser.gender|| "",
            phone:fetchedUser.phone || "",
            status: fetchedUser.status || "",
            Profilepic:  "",
            Coverpic:  "",
          });
          const [notification, setNotification] = useState({
            show: false,
            type: "warning",
            text: "",
          });
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
        // e.preventDefault();
        setSubmitted(true);
        // console.log(values);
        setformValues(values);
      };
    

      useEffect(() => {
        const updateprofile = async (dataToSend) => {
            const formData = new FormData();
            formData.append("FirstName", dataToSend.FirstName);
            formData.append("LastName", dataToSend.LastName);
            formData.append("username", dataToSend.username);
            formData.append("email", dataToSend.email);
            formData.append("location", dataToSend.location);
            formData.append("occupation", dataToSend.occupation);
            formData.append("age", dataToSend.age);
            formData.append("gender", dataToSend.gender);
            formData.append("phone", dataToSend.phone);
            formData.append("status", dataToSend.status);
           
            if (dataToSend.Profilepic) {
                formData.append("Profilepic", dataToSend.Profilepic);
              }
          
              if (dataToSend.Coverpic) {
                formData.append("Coverpic", dataToSend.Coverpic);
              }
          
            const responseData = await fetch(
                `http://localhost:5000/user/findByIdAndUpdate`,
                {
                  method: "PUT",
                  body: formData,
                  headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,

                   },
                }
              );
              const data = await responseData.json();
    
          console.log(data);
            if (data) {
              const err = data.message || {};
              if (err) {
                setNotification({
                  show: true,
                  type: "success",
                  text: err,
                });
                goToHome();
              }
           
          } else if (data) {
            const err = data.message || {};
    
            if (err) {
              setNotification({
                show: true,
                type: "warning",
                text: err,
              });
            }
          } else {
            setNotification({
              show: true,
              type: "error",
              text: "unknownerror",
            });
          }
        };
        try {
          if (submitted) {

            updateprofile(formvalues);
          } else {
            setSubmitted(false);
          }
        } catch (error) {
          console.log(error);
        }
      }, [submitted]);
      let goToHome = () => {
        setTimeout(() => {
          navigate("/profile", { replace: true });
        }, 2000);
      };
  return (
    <>
            <Stack
          sx={{ width: "70%", margin: "auto", marginBottom: "30px" }}
          spacing={2}
        >
          {notification.show && (
            <Alert severity={notification.type} variant="filled">
              {notification.text}
            </Alert>
          )}
        </Stack>
        <Formik
    onSubmit={handleFormSubmit}
    initialValues={formvalues }
    validationSchema={ProfileSchema }
    enableReinitialize
  >
    {({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue,
      resetForm,
    }) => (
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
                    <TextField
                label="username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={
                  Boolean(touched.username) && Boolean(errors.username)
                }
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
          
              <TextField
                label="FirstName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.FirstName}
                name="FirstName"
                error={
                  Boolean(touched.FirstName) && Boolean(errors.FirstName)
                }
                helperText={touched.FirstName && errors.FirstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="LastName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.LastName}
                name="LastName"
                error={Boolean(touched.LastName) && Boolean(errors.LastName)}
                helperText={touched.LastName && errors.LastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 2" }}
              />
                        <TextField
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            disabled
            name="email"
            error={Boolean(touched.email) && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={{ gridColumn: "span 2" }}
          />
                            <TextField 
                  label="Age"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  error={!!errors.age}
                  helperText={errors.age && errors.age}
                   fullWidth />
                                 <TextField
                      id="outlined-select-currency"
                      select
                      label="Gender"
                      name='gender'
                      value={values.gender}
                      onChange={handleChange}
                      fullWidth
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField 
                  label="Phone"
                  type="number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  error={Boolean(touched.phone) && Boolean(errors.phone)}
                  helperText={errors.phone && errors.phone}
             
                  fullWidth
                   />
                                       <TextField
                      id="outlined-select-currency"
                      select
                      label="Status"
                      name='status'
                      value={values.status}
                      onChange={handleChange}
                    
                      fullWidth
                    >
                      {Status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >

                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("Profilepic", acceptedFiles[0])
                  }
                >

                  {({ getRootProps, getInputProps }) => (


                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
   <FlexBetween>
                         <Box
                        component="img"
                        style={{ width: 100, height: 100 }}
                        alt="The house from the offer."

                        src={fetchedUser.Profilepic}
                        />
                      <input {...getInputProps()} />
                      {!values.Profilepic ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Box
                              style={{ width: 100, height: 100 }}
                              component="img"
                              alt="The house from the offer."
                              src={URL.createObjectURL(values.Profilepic)}
                            />
                            <Typography variant="h6" style={{ color: "red" }}>
                              {values.Profilepic.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}

   </FlexBetween>

                    </Box>
                  )}
                </Dropzone>
              </Box>
        
       
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >

                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("Coverpic", acceptedFiles[0])
                  }
                >

                  {({ getRootProps, getInputProps }) => (


                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
   <FlexBetween>
                         <Box
                        component="img"
                        style={{ width: 100, height: 100 }}
                        alt="The house from the offer."

                        src={fetchedUser.Coverpic}
                        />
                      <input {...getInputProps()} />
                      {!values.Coverpic ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Box
                              style={{ width: 100, height: 100 }}
                              component="img"
                              alt="The house from the offer."
                              src={URL.createObjectURL(values.Coverpic)}
                            />
                            <Typography variant="h6" style={{ color: "red" }}>
                              {values.Coverpic.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}

   </FlexBetween>

                    </Box>
                  )}
                </Dropzone>
              </Box>
        
       


        </Box>

        {/* BUTTONS */}
        <Box>
          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
           Update
          </Button>

        </Box>
      </form>
    )}
  </Formik>
    </>

  )
}

export default ProfileUpdateForm