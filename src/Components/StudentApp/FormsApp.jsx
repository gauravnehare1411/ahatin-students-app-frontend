import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';
import { Container } from 'react-bootstrap';
import ApplicationDetails from './ApplicationForm/ApplicationTracker';
import Header from '../includes/Header';

export default function FormsApp() {
  return (
    <div className="bg-light min-vh-100 py-3">
      <Container className="bg-white shadow-sm rounded p-0">
        <Header />
        <div className="p-4">
          <Routes>
            <Route path='/' element={<ApplicationForm />} />
            <Route path='/:application_id' element={<ApplicationDetails />} />
          </Routes>
        </div>
      </Container>
    </div>
  );
}
