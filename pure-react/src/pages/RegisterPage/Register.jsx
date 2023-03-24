import React, { useState, useEffect } from "react";
import {
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { register } from "../../State/authReducer/AuthSlice.js";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
const initialState = {
  username: "",
  email: "",
  password: "",
  confirm_pass: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password,  username, confirm_pass } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm_pass) {
      return toast.error("Password should match");
    }
    if (email && password && username && confirm_pass) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <Box width="100%"
    backgroundColor={theme.palette.background.loginBackGround}
    p="1rem 3%"
    textAlign="center"
    height="100vh"
    overflow="auto"
    >
        <Typography
          fontWeight="bold"
          fontSize="40px"
          color="primary"
        >
         Tour
        </Typography>
        <Box
        width={isNonMobileScreens ? "60%" : "95%"}
        p="2rem"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.login}
      >
        <Typography fontWeight="500" variant="h2" sx={{ mb: "1.5rem" , color:"red" }}>
          Welcome to TourSite ... !!
        </Typography>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">

            <div className="col-md-12">
              <MDBInput
                label="User Name"
                type="text"
                value={username}
                name="username"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide user name"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password Confirm"
                type="password"
                value={confirm_pass}
                name="confirm_pass"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide confirm password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <Link to="/login">
        <Typography

              sx={{
                textDecoration: "underline",
                color: theme.palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color:theme.palette.primary.light,
                },
              }}
            >
              Already have an account? Login here.
           
            </Typography>

        </Link>

        </Box>
   </Box>
  );
};

export default Register;
