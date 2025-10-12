import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import api from "../../api";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { toast } from "react-toastify";
import ForgotPasswordModal from "./ForgotPasswordModal";

const AuthView = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    contactnumber: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const [extraData, setExtraData] = useState({
    first_school: '',
    date_of_birth: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExtraChange = (e) => {
    const { name, value } = e.target;
    setExtraData({ ...extraData, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.password || !formData.confirmPassword) {
      alert("Please fill all fields before proceeding.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        contactnumber: formData.contactnumber,
        password: formData.password,
        security_questions: {
          first_school: extraData.first_school,
          date_of_birth: extraData.date_of_birth,
        },
        roles: ["student"],
      };

      const res = await api.post("/register", payload);
      toast.success("Registration successful!.");
      setIsRegister(false);
      login((res.data));
      navigate('/');

    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.detail || "Error occurred during registration");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const form = new URLSearchParams();
      form.append("username", formData.email);
      form.append("password", formData.password);

      const res = await api.post("/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      login(res.data);
      toast.success("Login successful!");
      if (res.data.roles?.includes('student')){
        console.log(res.data.roles?.includes('student'));
        navigate('/');
      } else {
        console.log(res.data.roles?.includes('student'));
        navigate('/admin');
      }
      
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div>
      <header className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#5a3df0",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            AH
          </div>
          <div>
            <h5 className="mb-0">AHatIn Consultancy</h5>
            <small className="text-muted">Student Application Portal</small>
          </div>
        </div>
        <Button variant="primary" onClick={() => setIsRegister(!isRegister)}>
          Login / Register
        </Button>
      </header>

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Row
          className="shadow rounded bg-white p-4"
          style={{ maxWidth: "900px", width: "100%" }}
        >
          <Col md={6} className="border-end pe-4">
            <h3 className="mb-3">{isRegister ? "Student Registration" : "Student Login"}</h3>
            <Form onSubmit={isRegister ? handleNext : handleLogin}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </Form.Group>

              {isRegister && (
                <>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactnumber"
                      value={formData.contactnumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter Password"
                      required
                    />
                  </Form.Group>
                </>
              )}

              {!isRegister && (
                <Form.Group className="mb-3" controlId="formPasswordLogin">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </Form.Group>
              )}

              <div className="d-flex gap-2">
                <Button type="submit" variant="primary">
                  {isRegister ? "Next" : "Login"}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? "Login" : "Create account"}
                </Button>
              </div>
            </Form>
            {!isRegister && 
              <Button variant="link" onClick={() => setShowForgotModal(true)}>
                Forgot Password?
              </Button>
            }

            <ForgotPasswordModal
              show={showForgotModal}
              onHide={() => setShowForgotModal(false)}
            />
          </Col>

          <Col md={6} className="ps-4">
            <h5 className="mb-3">Why use AHatIn portal?</h5>
            <ul>
              <li>Fill application</li>
              <li>Track application status with timeline</li>
              <li>Our team reviews your application</li>
              <li>Check your eligibility</li>
            </ul>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Additional Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formSchool">
              <Form.Label>What was your first school name?</Form.Label>
              <Form.Control
                type="text"
                name="first_school"
                value={extraData.first_school}
                onChange={handleExtraChange}
                placeholder="Enter your first school name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={extraData.date_of_birth}
                onChange={handleExtraChange}
                required
              />
            </Form.Group>

            <div className="text-end">
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <footer className="text-center py-3 bg-white border-top">
        <small className="text-secondary">AHatIn - International & Educational Hat</small>
      </footer>
    </div>
  );
};

export default AuthView;