import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './Components/AuthView/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/AuthView/LoginPage';
import { ToastContainer } from 'react-toastify';
import Home from './Components/StudentApp/Home';

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
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
