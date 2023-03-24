import { Box, Button, Paper, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Header from "../utils/Header/Header.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import { Link} from "react-router-dom";
import "./resetpassword.scss";

const ResetPassword = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  let navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formvalues, setformValues] = useState({
    oldpassword: "",
    password: "",
    confirm_pass: "",
  });

  const [showoldPassword, setShowoldPassword] = useState(false);
  const toggleoldPassword = () => {
    setShowoldPassword(!showoldPassword);
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [showcomPassword, setShowcomPassword] = useState(false);
  const togglecomPassword = () => {
    setShowcomPassword(!showcomPassword);
  };
  const [notification, setNotification] = useState({
    show: false,
    type: "warning",
    text: "",
  });
  const handleFormSubmit = (values) => {
    // e.preventDefault();
    setSubmitted(true);
    // console.log(values);
    setformValues(values);
  };






  useEffect(() => {






    const resetPassword = async (dataToSend) => {
      const responseData = await fetch(
        `http://localhost:5000/auth/resetpassword`,
        {
          method: "PUT",
          body: JSON.stringify(dataToSend),
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
           },
        }
      );
      const data = await responseData.json();
        if (data) {
          const err = data.message || {};
          if (err) {
            setNotification({
              show: true,
              type: "success",
              text: "Congratulation ,Your Password has been changed",
            });
            goToHome();
          }
        } else if (data) {
        const err = data.message || {};
        setNotification({
          show: true,
          type: "warning",
          text: err,
        });
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
        //for frontend before backend
        resetPassword(formvalues);
      } else {
        setSubmitted(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [submitted]);
  let goToHome = () => {
    setTimeout(() => {
      navigate("/home", { replace: true });
    }, 2000);
  };
  return (
    <Paper sx={{ width: "100%", m: "10px auto", p: 2 ,borderRadius:"20px", boxShadow: 3}}>

<Box m="20px">
<MuiLink
                  component={Link}
                  to={`/home`}
                  underline="none"
                  color="inherit"
                >
    <Header title="RESET-PASSWORD" subtitle="Reset-password-Page" />

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
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },

                  width: "70%",
                  margin: "auto",
                }}
              >
                <Box className="password" sx={{ gridColumn: "span 4" }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type={showoldPassword ? "text" : "password"}
                    label="OldPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.oldpassword}
                    name="oldpassword"
                    error={!!touched.oldpassword && !!errors.oldpassword}
                    helperText={touched.oldpassword && errors.oldpassword}
                  />
                  <Box className="icon" onClick={toggleoldPassword}>
                    {showoldPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </Box>
                </Box>
                <Box className="password" sx={{ gridColumn: "span 4" }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type={showPassword ? "text" : "password"}
                    label="New Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box className="icon" onClick={togglePassword}>
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </Box>
                </Box>
                <Box className="password" sx={{ gridColumn: "span 4" }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type={showcomPassword ? "text" : "password"}
                    label="Confirmation-Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirm_pass}
                    name="confirm_pass"
                    error={!!touched.confirm_pass && !!errors.confirm_pass}
                    helperText={touched.confirm_pass && errors.confirm_pass}
                    sx={{ gridColumn: "span 4" }}
                  />

                  <Box className="icon" onClick={togglecomPassword}>
                    {showcomPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </Box>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Reset-password
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>

    </Paper>

  );
};
const checkoutSchema = yup.object().shape({
  oldpassword: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "password must be greater than 8 char must be strong"
    )
    .required("This Message Field is required"),
  password: yup
    .string().notOneOf([yup.ref("oldpassword"),null],"password should not equal old password")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "password must be greater than 8 char must be strong"
    )
    .required("This Message Field is required"),
  confirm_pass: yup
    .string().oneOf([yup.ref("password"),null],"password should be match new password")
    // .when("password", (password, field) =>
    //   password ? field.required().oneOf([yup.ref("password")]) : field
    // ),
});
const initialValues = {
  oldpassword: "",
  password: "",
  confirm_pass: "",
};
export default ResetPassword;
