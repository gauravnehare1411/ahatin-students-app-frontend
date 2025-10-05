import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const res = await api.post("/register", formData);
        alert("Registration successful! Please login.");
        setIsRegister(false);
      } else {
        const form = new URLSearchParams();
        form.append("username", formData.email);
        form.append("password", formData.password);

        const res = await api.post("/login", form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        alert("Login successful!");
      }
    console.log(res.data);
    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refress_token", res.data.refresh_token);
    
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.detail || "Error occurred");
    }
  }

  const handleForm = () => {
    
  }

  return (
    <div>
      <header className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center"> 
        <div className="d-flex align-items-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-3" 
            style={{ width: "40px", height: "40px", backgroundColor: "#5a3df0", color: "#fff", fontWeight: "bold", fontSize: "16px", }} 
          > AH 
          </div> 
          <div> 
            <h5 className="mb-0">AHatIn Consultancy</h5> 
            <small className="text-muted">Student Application Portal (MVP)</small> 
          </div> 
        </div> 
        <Button variant="primary">Login / Register</Button> 
      </header>

      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Row className="shadow rounded bg-white p-4" style={{ maxWidth: "900px", width: "100%" }}>

          <Col md={6} className="border-end pe-4">
            <h3 className="mb-3">Student Login</h3>
            <Form onSubmit={ handleSubmit }>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={ handleChange } placeholder="Email" />
              </Form.Group>

              { isRegister && (
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={ handleChange } placeholder="Full Name" required={isRegister} />
                </Form.Group>
              )}

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={ handleChange } placeholder="Password" />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button type="submit" variant="primary"> { isRegister? "Submit" : "Login" }</Button>
                <Button variant="outline-secondary" onClick={ ()=> setIsRegister(!isRegister) }>{ isRegister? "Login" : "Create account"}</Button>
              </div>
            </Form>
          </Col>

          <Col md={6} className="ps-4">
            <h5 className="mb-3">Why use AHatIn portal?</h5>
            <ul>
              <li>Fill application</li>
              <li>Track application status with timeline</li>
              <li>Out team reviews your application</li>
              <li>Checks your eligibility</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <footer className="text-center py-3 bg-white border-top">
        <small className="text-secondary">
          Built with ❤️ for AHatIn.
        </small>
      </footer>
    </div>
  );
};

export default LoginPage;