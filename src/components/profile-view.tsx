import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { ProfileViewProps } from '../types';

const ProfileView = ({
  userData,
  anchorEl,
  open,
  handleClose,
  handleLogout,
}: ProfileViewProps) => (
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
      <Typography sx={{ fontWeight: 'bold' }}>{userData.name}</Typography>
      <Typography sx={{ fontSize: '0.9rem' }}>{userData.email}</Typography>
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
);

export default ProfileView;
