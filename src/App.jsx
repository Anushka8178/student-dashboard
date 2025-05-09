import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import './App.css';

function Navigation() {
  return (
    <nav className="nav-container">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/add-student" className="nav-link">Add Student</Link>
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/signup" className="nav-link">Sign Up</Link>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/add-student"
            element={
              <PrivateRoute>
                <AddStudent />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
