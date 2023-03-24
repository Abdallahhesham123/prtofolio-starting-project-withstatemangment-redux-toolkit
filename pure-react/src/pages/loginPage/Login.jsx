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
import {  login } from "./../../State/authReducer/AuthSlice.js";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
// import { GoogleLogin } from "react-google-login";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  useEffect(() => {
     error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };


  const devEnv = process.env.NODE_ENV !== "production";

  

  // const googleSuccess = (resp) => {
  //   const email = resp?.profileObj?.email;
  //   const name = resp?.profileObj?.name;
  //   const token = resp?.tokenId;
  //   const googleId = resp?.googleId;
  //   const result = { email, name, token, googleId };
  //   // dispatch(googleSignIn({ result, navigate, toast }));
  // };
  // const googleFailure = (error) => {
  //   toast.error(error);
  // };
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
            <div className="col-md-12"  sx={{backGroundColor: `${theme.palette.grey[10]} !important`}} >
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
               
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
                pattern='/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/'
                validation="Please provide your password"
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
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          {/* <GoogleLogin
            clientId="Your Client Id"
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
              </MDBBtn>
            )}
            // onSuccess={googleSuccess}
            // onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
        </MDBCardBody>
        <Link to="/">
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
              Don't have an account? Sign Up here.
           
            </Typography>

        </Link>
          <Link to="/sendpasswordresetemail">

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
          ForgetPassword
          </Typography>
          </Link>

        </Box>
   </Box>
  );
};

export default Login;
