import { useMemo } from "react";
import { useSelector } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import Layout from "./components/utils/Layout/Layout.jsx";
import Template from "./components/utils/Template/Template.jsx";
import Notfound from "./components/utils/NotFound/Notfound.jsx";
import Protectedroute from "./components/utils/ProtectetedRoute/PrivateRoute.js";
import Home from "./pages/homePage/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Login from "./pages/loginPage/Login.jsx";
import Register from "./pages/RegisterPage/Register.jsx";
import {ToastContainer } from "react-toastify";
import SendingEmail from './components/forgetpassword/SendingEmail.jsx';
import ResetPasswordGeneration from './components/forgetpassword/ResetPasswordGeneration.jsx';
import  VerifyEmail from './components/VerifyEmail/VerifyEmail.jsx';
import Update from "./components/update/Update.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  let routes = createBrowserRouter([
    { path: "/", element: <Layout />,errorElement: <Notfound />, children: [
        { index: true, element: <Register />  },
        { path: "/login",element:  <Login /> },
        { path: "/home",element: ( <Protectedroute><Template><Home /></Template> </Protectedroute>)},
        {
          path: "/profile",
          element: ( <Protectedroute><Template> <Profile /> </Template></Protectedroute>),
        },
        {
          path: "updateProfile/:id",
          element: ( <Template><Update/></Template> )},
        {
          path: "reset-password",
          element: (<Template><ResetPassword/></Template>)},
        { path: "/sendpasswordresetemail", element:<SendingEmail />},
        { path: "reset-password/:id/:token", element:  <ResetPasswordGeneration/>},
        { path: "/verification-email/:id", element:  <VerifyEmail/>}
        
      ],
    },
  ]);
  return (
    <>
              <ThemeProvider theme={theme}>
              <CssBaseline />
              <RouterProvider router={routes} />
              </ThemeProvider>
              <ToastContainer/>
            
    </>

  );
}

export default App;
