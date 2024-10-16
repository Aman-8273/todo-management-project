import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Home from './components/Home';
import TodoPage from './components/TodoPage';
import ProtectedRoute from './routing/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Box>
        <Header />
        <Box sx={{ mt: 4 }}>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route element={<ProtectedRoute />}>
              <Route
                path='/todo'
                element={<TodoPage />}
              />
            </Route>
            <Route
              path='*'
              element={<Navigate to='/' />}
            />{' '}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
