import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/navbar';
import Home from './components/Home';
import TodoPage from './components/TodoPage';
import ProtectedRoute from './routing/protected-route';
import UserProvider from './context/user-context.tsx';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Header />
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
          />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
