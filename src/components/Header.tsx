import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../types';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Avatar,
} from '@mui/material';

//Icons
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const navigate = useNavigate();

  //Manage user authentication
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  //Profile information drawer
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  //get user information from localStorage
  const userData: UserData | null = JSON.parse(
    localStorage.getItem('token') || 'null'
  );
  // console.log(userData);

  //check and set the user authentication
  const storedUser: boolean = JSON.parse(
    localStorage.getItem('authenticate') || 'false'
  );
  useEffect(() => {
    setAuthenticated(storedUser);
  }, [storedUser]);

  //Logout
  const handleLogout = () => {
    localStorage.setItem('authenticate', JSON.stringify(false));
    setAuthenticated(false);
    handleClose();
    navigate('/');
  };

  // Open profile drawer.
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
                {/* <img
                  src={userData.picture}
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%' }}
                /> */}
                <Avatar src={userData?.picture || '/fallback-avatar.png'} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ disablePadding: true }}
              >
                <Box
                  sx={{
                    backgroundColor: 'whitesmoke',
                    width: '20rem',
                    height: '5rem',
                    position: 'relative',
                  }}
                >
                  <Typography
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '1.2rem',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                    }}
                  >
                    {userData.email}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '3.5rem',
                    zIndex: 1,
                  }}
                >
                  <Avatar
                    src={userData.picture}
                    sx={{ width: '3.2rem', height: '3.2rem' }}
                  />
                </Box>

                <Box
                  sx={{
                    paddingTop: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {userData.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem' }}>
                    {userData.email}
                  </Typography>
                </Box>

                <MenuItem
                  onClick={handleLogout}
                  sx={{ display: 'flex', justifyContent: 'center', mt: '3rem' }}
                >
                  <Button variant='text'>
                    <LogoutIcon sx={{ mx: 1 }} />
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
