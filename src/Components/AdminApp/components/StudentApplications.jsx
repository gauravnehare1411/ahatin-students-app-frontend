import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Table, Spinner, Container, Alert, Button } from "react-bootstrap";
import api from "../../../api";
import { Trash } from "react-bootstrap-icons";
import { toast } from "react-toastify";

const StudentApplications = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await api.get(`admin/student/applications/${userId}`);
        setApplications(response.data || []);
      } catch (error) {
        console.error("Error fetching user applications:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, [userId]);

  const handleDelete = async (applicationId) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      await api.delete(`/applications/${applicationId}`);
      setApplications((prev) => prev.filter((app) => app.applicationId !== applicationId));
      toast.success("Application deleted successfully!");
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info" className="text-center">
          No applications found for this user.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="p-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <strong>User Applications</strong>
        </Card.Header>
        <Card.Body>
          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Application ID</th>
                <th>Preferred Country</th>
                <th>Preferred Course</th>
                <th>Status</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr
                  key={app.applicationId}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/admin/applications/${app.applicationId}`)}
                >
                  <td>{index + 1}</td>
                  <td>{app.applicationId}</td>
                  <td>{app.studyPreferences?.preferredCountry}</td>
                  <td>{app.studyPreferences?.preferredCourse}</td>
                  <td>
                    <span
                      className={`badge ${
                        app.status === "Accepted"
                          ? "bg-success"
                          : app.status === "Rejected"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>{new Date(app.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(app.applicationId);
                      }}
                    >
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StudentApplications;
