import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData, SnackBar } from '../types';
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
import SnackbarAlert from '../snackbar';

const Header = () => {
  const navigate = useNavigate();

  //Setting snackbar
  const [snackbar, setSnackbar] = useState<SnackBar>({
    open: false,
    message: '',
    severity: 'success',
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });

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

  //Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  //Handle on logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('authenticate', JSON.stringify(false));
    //Show success snackbar
    setSnackbar({
      open: true,
      message: 'Logout successfully!',
      severity: 'success',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
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

          {/* Logout snackbar */}
          <SnackbarAlert
            open={snackbar.open}
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            message={snackbar.message}
            horizontalPosition={snackbar.horizontalPosition}
            verticalPosition={snackbar.verticalPosition}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
