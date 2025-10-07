import React, { useEffect, useState } from "react";
import { Card, Table, Spinner, Row, Col, Button, Container } from "react-bootstrap";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../includes/Header";

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, appsRes] = await Promise.all([
          api.get("/user"),
          api.get("/student/applications"),
        ]);
        setProfile(profileRes.data);
        setApplications(appsRes.data);
      } catch (error) {
        toast.error("Failed to load student data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner animation="border" className="m-5" />;

  return (
    <div className="container my-5">
      <Container>
        <div className="mb-4">
        <Header />
        </div>
        <h2 className="mb-4 text-center text-primary">Student Dashboard</h2>

        <Card className="mb-4 shadow-sm p-3">
            <h5>Profile Information</h5>
            {profile && (
            <ul className="list-unstyled">
                <li><strong>Name:</strong> {profile.name}</li>
                <li><strong>Email:</strong> {profile.email}</li>
                <li><strong>Phone:</strong> {profile.contactnumber}</li>
            </ul>
            )}
        </Card>

        <Card className="shadow-sm p-3">
            <h5>Applications</h5>
            {applications.length === 0 ? (
            <p className="text-muted">No applications yet.</p>
            ) : (
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Preferred Country</th>
                    <th>Course</th>
                    <th>Intake Month</th>
                    <th>Intake Year</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {applications.map((app, index) => (
                    <tr
                    key={app.applicationId}
                    style={{ cursor: "pointer" }}
                    onClick={() => (window.location.href = `/application/${app.applicationId}`)}
                    >
                    <td>{index + 1}</td>
                    <td>{app.studyPreferences?.preferredCountry}</td>
                    <td>{app.studyPreferences?.preferredCourse}</td>
                    <td>{app.studyPreferences?.preferredIntakeMonth}</td>
                    <td>{app.studyPreferences?.preferredIntakeYear}</td>
                    <td>
                        <span className={`badge bg-${
                        app.status === "Accepted" ? "success" :
                        app.status === "Rejected" ? "danger" :
                        app.status === "Under Review" ? "warning" : "secondary"
                        }`}>
                        {app.status || "Pending"}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            )}
        </Card>
        <Row className="mt-4 d-flex justify-content-between">
            <Col xs="auto">
                <Button onClick={()=>navigate('/application')}>Fill Application</Button>
            </Col>
        </Row>
      </Container>
    </div>
  );
}
