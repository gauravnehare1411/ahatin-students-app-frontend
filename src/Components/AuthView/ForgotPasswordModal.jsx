import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../api";
import { toast } from "react-toastify";

const ForgotPasswordModal = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [securityAnswers, setSecurityAnswers] = useState({ first_school: "", dob: "" });
  const [passwordData, setPasswordData] = useState({ newPassword: "", confirmPassword: "" });

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email.");

    try {
      const res = await api.post("/forgot-password", { email });
      toast.success(res.data.message);
      setStep(2);
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.detail || "Error verifying email");
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    if (!securityAnswers.first_school || !securityAnswers.dob)
      return toast.error("Please fill all security questions.");

    try {
      const res = await api.post("/verify-security-questions", {
        email,
        ...securityAnswers,
      });
      toast.success(res.data.message);
      setStep(3);
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.detail || "Security answers incorrect");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = passwordData;

    if (!newPassword || !confirmPassword) return toast.error("Please enter password fields.");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match.");

    try {
      await api.post("/reset-password", { email, new_password: newPassword });
      toast.success("Password reset successful!");
      setStep(1);
      setEmail("");
      setSecurityAnswers({ first_school: "", dob: "" });
      setPasswordData({ newPassword: "", confirmPassword: "" });
      onHide();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.detail || "Password reset failed");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <Form onSubmit={handleEmailSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <div className="text-end">
              <Button type="submit" variant="primary">
                Next
              </Button>
            </div>
          </Form>
        )}

        {step === 2 && (
          <Form onSubmit={handleSecuritySubmit}>
            <Form.Group className="mb-3" controlId="formSchool">
              <Form.Label>First School Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first school name"
                value={securityAnswers.first_school}
                onChange={(e) =>
                  setSecurityAnswers({ ...securityAnswers, first_school: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={securityAnswers.dob}
                onChange={(e) =>
                  setSecurityAnswers({ ...securityAnswers, dob: e.target.value })
                }
                required
              />
            </Form.Group>

            <div className="text-end">
              <Button type="submit" variant="primary">
                Next
              </Button>
            </div>
          </Form>
        )}

        {step === 3 && (
          <Form onSubmit={handlePasswordReset}>
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                required
              />
            </Form.Group>

            <div className="text-end">
              <Button type="submit" variant="primary">
                Reset Password
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
