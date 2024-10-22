import { useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Typography, Box } from '@mui/material';
import { DecodedToken } from '../types/index.js';
import todoImage from '../assets/png/login-page.png';

const Home = () => {
  const navigate = useNavigate();

  //Getting token after user validation and storing in localstorage
  const onSuccess = (credentialResponse: CredentialResponse) => {
    try {
      console.log(credentialResponse?.credential);

      if (credentialResponse?.credential) {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(
          credentialResponse.credential
        );
        if (decoded) {
          localStorage.setItem('authenticate', JSON.stringify(true));
        }

        if (decoded.email_verified) {
          localStorage.setItem('token', JSON.stringify(decoded));
          navigate('/todo');
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        margin: '2rem',
      }}
    >
      {/* About application features  */}
      <Box sx={{ marginTop: '1rem', width: '45rem' }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '3rem',
            textAlign: 'center',
          }}
        >
          To-Do List
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.4rem' },
            textAlign: 'center',
          }}
        >
          with only the feature you need, To-Do application is customized for
          individuals seeking a stress-free way to stay focused on their goals,
          projects and tasks.
        </Typography>
      </Box>

      {/* Google login UI */}
      <Box
        sx={{
          width: '20rem',
          backgroundColor: 'whitesmoke',
          padding: '3rem',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '1.6rem', md: '2rem' },
            textAlign: 'center',
          }}
        >
          Welcome Back!
        </Typography>
        <Typography variant='caption'>
          Log in now and turn your todo's into accomplishments.
        </Typography>
        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          <GoogleLogin
            onSuccess={onSuccess}
            onError={() => {
              alert('Login Failed');
            }}
          />
          <img
            src={todoImage}
            alt='Login illustration'
            style={{
              marginTop: '1rem',
              width: '70%',
              height: 'auto',
              marginLeft: '3rem',
              maxHeight: '12rem',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
