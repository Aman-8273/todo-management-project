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

const App = () => {
  return (
    <Router>
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
        />{' '}
      </Routes>
    </Router>
  );
};

export default App;
