import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './Components/AuthView/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/AuthView/LoginPage';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './Context/ProtectedRoute.jsx';
import FormsApp from './Components/StudentApp/FormsApp.jsx';
import StudentDashboard from './Components/StudentApp/StudentDashboard.jsx';
import AdminApp from './Components/AdminApp/AdminApp.jsx';

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/application/*" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <FormsApp />
              </ProtectedRoute>
            } />

            <Route path="/" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            } />

            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminApp />
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
