import React from "react"
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../Navbar/Navbar.jsx";

const Template = ({children}) => {

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <>
        <Navbar />
    <Box>
  <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
           {children}
        </Box>
   
</Box>
    </>

  )
}

export default Template