// InnerApp.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import StudentApplications from './components/StudentApplications';
import { Container } from 'react-bootstrap';
import Header from '../includes/Header';
import ApplicationDetails from './components/ApplicationDetails';
import EditApplication from './components/EditApplication';

const AdminApp = () => {
  return (
    <div className="bg-light min-vh-100 py-3">
      <Container className="bg-white shadow-sm rounded p-0">
        <Header />
        <div className="p-4">
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/:userId" element={<StudentApplications />} />
            <Route path="/applications/:application_id" element={<ApplicationDetails />} />
            <Route path="/applications/:application_id/edit" element={<EditApplication />} />
        </Routes>
        </div>
      </Container>
    </div>
  );
};

export default AdminApp;