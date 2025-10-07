import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm border-bottom">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px', marginRight: '10px' }}
          >
            AH
          </div>
          <div>
            <h5 className="mb-0 fw-semibold">AHatIn Consultancy</h5>
            <small className="text-muted">Student Application Portal (MVP)</small>
          </div>
        </div>

        {/* Right section: Buttons + Email */}
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            className="px-3 py-1"
          >
            Dashboard
          </Button>
          <Button
            variant="outline-secondary"
            onClick={handleLogout}
            className="px-3 py-1"
          >
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
