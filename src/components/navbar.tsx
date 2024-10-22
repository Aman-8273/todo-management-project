import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../types';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ProfileView from './profile-view';

const Header = () => {
  const navigate = useNavigate();

  //Managing user authentication
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  //Profile information drawer
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  //Getting user information from localStorage
  const userData: UserData | null = JSON.parse(
    localStorage.getItem('token') ?? 'null'
  );

  //Checking and setting the user authentication
  const storedUser: boolean = JSON.parse(
    localStorage.getItem('authenticate') ?? 'false'
  );
  useEffect(() => {
    setAuthenticated(storedUser);
  }, [storedUser]);

  //Handle on logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('authenticate', JSON.stringify(false));
    setAuthenticated(false);
    handleClose();
    navigate('/');
  };

  // Opens profile drawer.
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //Close profile drawer
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar sx={{ position: 'static' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* LOGO */}
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ListAltIcon sx={{ mx: 2 }} /> TODO
          </Typography>

          {/* Profile information drawer */}
          {authenticated && userData && (
            <Box>
              <IconButton onClick={handleOpen}>
                <Avatar src={userData.picture || '/fallback-avatar.png'} />
              </IconButton>

              <ProfileView
                userData={userData}
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                handleLogout={handleLogout}
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
