import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import UserImage from '../utils/UserImage.jsx'

import FlexBetween from '../utils/FlexBetween.jsx';

import { useDispatch, useSelector } from 'react-redux';


import { setMode, setLogout } from "../../State/authReducer/AuthSlice.js";
import { Link, Navigate ,useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const dispatch = useDispatch();
const theme = useTheme();
const { user } = useSelector((state) => ({ ...state.auth }));
const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
const dark = theme.palette.neutral.dark;
const neutralLight = theme.palette.neutral.light;
const background = theme.palette.background.default;
const primaryLight = theme.palette.primary.light;
const alt = theme.palette.background.alt;

const handleLogout = () => {
  dispatch(setLogout());
  <Navigate to="/"/>
};
  return (
    <FlexBetween padding="0.5rem 3%" backgroundColor={alt}>
      <FlexBetween gap="1rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color={dark}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          TourMedia
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="1rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "20px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "20px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "20px" }} />

          <FormControl variant="standard" value={user.username}>

            <Select
             value={user.username}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "1.5rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={user.username}>
                <Typography>{user.username}</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleLogout()}>Log Out</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Open settings">
          <Link to="/profile">
             <Avatar alt="Remy Sharp" src={ user.Profilepic ? user.Profilepic : PF+`person/noAvatar.png`} /> 
             </Link>
         </Tooltip>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2.5rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "20px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "20px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "20px" }} />
            <Notifications sx={{ fontSize: "20px" }} />
            <Help sx={{ fontSize: "20px" }} />
            <FormControl variant="standard" value={user.username}>
              <Select
                value={user.username}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={user.username}>
                  <Typography>{user.username}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
            <Tooltip title="Open settings">
            <Link to="/profile">
             <Avatar alt="Remy Sharp" src={ user.Profilepic ? user.Profilepic : PF+`person/noAvatar.png`} /> 
             </Link>
         </Tooltip>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>



  )
}

export default Navbar