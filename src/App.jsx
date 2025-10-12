import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './Context/ProtectedRoute.jsx';
import FormsApp from './Components/StudentApp/FormsApp.jsx';
import StudentDashboard from './Components/StudentApp/StudentDashboard.jsx';
import AdminApp from './Components/AdminApp/AdminApp.jsx';
import AuthView from './Components/AuthView/AuthView.jsx';

function App() {
  return (
    <>
      <div>
        <Router basename='portal'>
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
            
            <Route path="/auth" element={<AuthView/>} />
          </Routes>
          <ToastContainer position='top-center' autoClose={3000} hideProgressBar />
        </Router>
      </div>
    </>
  )
}

export default App
