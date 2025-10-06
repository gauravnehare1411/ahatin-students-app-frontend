import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './Components/AuthView/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/AuthView/LoginPage';
import { ToastContainer } from 'react-toastify';
import Home from './Components/StudentApp/Home';
import ProtectedRoute from './Context/ProtectedRoute.jsx';

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage/>} />
          </Routes>
          <ToastContainer position='top-center' autoClose={3000} hideProgressBar />
        </Router>
      </div>
    </>
  )
}

export default App
