import { useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Typography, Box } from '@mui/material';
import { DecodedToken, SnackBar } from '../types/index.js';
import todoImage from '../assets/png/login-page.png';
import { useContext, useState } from 'react';
import { UserContext } from '../context/user-context.js';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_LIST, GET_TODOS } from '../queries/index.ts';
import SnackbarAlert from '../snackbar/index.tsx';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  //Setting snackbar
  const [snackbar, setSnackbar] = useState<SnackBar>({
    open: false,
    message: '',
    severity: 'success',
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });

  //Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { setAuthenticated, setToken } = userContext;

  // Getting users and todos from backend api
  const [fetchUserId] = useLazyQuery(GET_USER_LIST);
  const [fetchTodos] = useLazyQuery(GET_TODOS);

  // Handling Google login
  const onSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const token = credentialResponse?.credential ?? '';
      localStorage.setItem('token1', token);
      console.log(token);
      // userContext?.setAuthenticated
      setToken(token);
      setAuthenticated(true);

      //login success message
      setSnackbar({
        open: true,
        message: 'Login successfully!',
        severity: 'success',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      const email = decoded.email;

      // Fetching user data from the backend
      fetchUserId({
        onCompleted: async (userResponse): Promise<void> => {
          const allEmails = userResponse.getAllowListByUsers;

          if (allEmails.includes(email)) {
            localStorage.setItem('authenticate', JSON.stringify(true));
            localStorage.setItem('token', JSON.stringify(decoded));

            // Fetch todos for the user
            fetchTodos({
              onCompleted: (todoResponse) => {
                const todos = todoResponse.getAllTodos;
                console.log(todos);

                if (todos && todos.length >= 0) {
                  navigate('/todo');
                }
              },
              onError: () => {
                setSnackbar({
                  open: true,
                  message: 'Failed to fetch todos',
                  severity: 'success',
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                navigate('/');
              },
            });
          } else {
            setSnackbar({
              open: true,
              message: 'User is not authorized',
              severity: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            navigate('/');
          }
        },
        onError: () => {
          setSnackbar({
            open: true,
            message: 'Failed to validate user',
            severity: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          navigate('/');
        },
      });
    } catch (error) {
      console.error('Error during login or fetching data:', error);
      alert('Failed to decode token. Please try again.');
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: '2rem', md: '8rem' },
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        padding: '1rem',
        margin: '2rem',
      }}
    >
      {/* Application details */}
      <Box sx={{ marginTop: '1rem', width: { xs: '100%', md: '45rem' } }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '3rem' },
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
          With only the feature you need, To-Do application is customized for
          individuals seeking a stress-free way to stay focused on their goals,
          projects, and tasks.
        </Typography>
      </Box>

      {/* Login form */}
      <Box
        sx={{
          width: { xs: '20rem', md: '20rem' },
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
            onError={() => alert('Login Failed')}
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

        {/* Login success message */}
        <SnackbarAlert
          open={snackbar.open}
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          message={snackbar.message}
          verticalPosition={snackbar.verticalPosition}
          horizontalPosition={snackbar.horizontalPosition}
        />
      </Box>
    </Box>
  );
};

export default Home;
