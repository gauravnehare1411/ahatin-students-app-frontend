import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Card, Spinner, Button, Form } from "react-bootstrap";
import api from "../../../api";
import { toast } from "react-toastify";

const ApplicationDetails = () => {
  const { application_id } = useParams();
  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState("Submitted");
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchApplication() {
      try {
        const response = await api.get(`/applications/${application_id}`);
        const data = response.data;
        console.log(data);
        setApplication(data);

        setStatus(data?.status || "Submitted");
      } catch (err) {
        console.error("Error fetching application:", err);
      }
    }
    fetchApplication();
  }, [application_id]);

  const handleStatusChange = async () => {
    try {
      setUpdating(true);
      await api.put(`/admin/application/${application_id}/status`, { status });
      setApplication((prev) => ({ ...prev, status }));
      toast.success("Status updated successfully!");
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  if (!application) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container fluid className="p-2">
      <Row>
        <Col>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <strong>Application Details</strong>
                <div className="d-flex align-items-center mt-2">
                  <Row>
                    <Col className="mb-2" md={4}>
                      <Form.Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ maxWidth:"200px", marginRight: "10px" }}
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </Form.Select>
                    </Col>
                    <Col className="mb-2" md={4}>
                      <Button
                        variant="light"
                        style={{marginRight: "10px"}}
                        disabled={updating}
                        onClick={handleStatusChange}
                      >
                        {updating ? "Updating..." : "Update Status"}
                      </Button>
                    </Col>
                    <Col md={4} className="mb-2">
                      <Button
                        variant="warning"
                        onClick={() => navigate(`/admin/applications/${application_id}/edit`)}
                      >
                        Edit Application
                      </Button>
                    </Col>
                  </Row>
                </div>
            </Card.Header>

            <Card.Body>
              {/* Education */}
              <h5 className="mb-3 text-primary">Educational Details</h5>
              <Table bordered hover responsive>
                <tbody>
                  <tr>
                    <td>Highest Qualification</td>
                    <td>{application.educational.highestQualification.type}</td>
                  </tr>
                  <tr>
                    <td>Institute</td>
                    <td>{application.educational.highestQualification.school}</td>
                  </tr>
                  <tr>
                    <td>Board</td>
                    <td>{application.educational.highestQualification.board}</td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>{application.educational.highestQualification.year}</td>
                  </tr>
                  <tr>
                    <td>Percentage/Grade</td>
                    <td>{application.educational.highestQualification.percentage}</td>
                  </tr>
                </tbody>
              </Table>

              {/* Previous Qualifications */}
              {application.educational.previousQualifications &&
              application.educational.previousQualifications.length > 0 && (
                <>
                <h6 className="mt-4 mb-2 text-secondary">Previous Qualifications</h6>
                <Table bordered hover responsive>
                    <thead>
                    <tr className="table-light">
                        <th>Type</th>
                        <th>Institute</th>
                        <th>Board</th>
                        <th>Year</th>
                        <th>Percentage/Grade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {application.educational.previousQualifications.map((qual, index) => (
                        <tr key={index}>
                        <td>{qual.type || "—"}</td>
                        <td>{qual.school || "—"}</td>
                        <td>{qual.board || "—"}</td>
                        <td>{qual.year || "—"}</td>
                        <td>{qual.percentage || "—"}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </>
              )}
              {/* Study Preferences */}
              <h5 className="mb-3 text-primary">Study Preferences</h5>
              <Table bordered hover responsive>
                <tbody>
                  <tr>
                    <td>Preferred Country</td>
                    <td>{application.studyPreferences.preferredCountry}</td>
                  </tr>
                  <tr>
                    <td>Preferred Course</td>
                    <td>{application.studyPreferences.preferredCourse}</td>
                  </tr>
                  <tr>
                    <td>Intake</td>
                    <td>
                      {application.studyPreferences.preferredIntakeMonth}{" "}
                      {application.studyPreferences.preferredIntakeYear}
                    </td>
                  </tr>
                  <tr>
                    <td>Degree Level</td>
                    <td>{application.studyPreferences.degreeLevel}</td>
                  </tr>
                  <tr>
                    <td>Preferred Universities</td>
                    <td>{application.studyPreferences.preferredUniversities}</td>
                  </tr>
                </tbody>
              </Table>

              {/* Cetifications */}
              <h5 className="mb-3 text-primary">Certifications Scores</h5>
              <Table bordered hover responsive>
                <tbody>
                  <tr>
                    <td>Has Certifications</td>
                    <td>{application.certifications.hasCertifications? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td>IELTS</td>
                    <td>{application.certifications.scores.ielts || "-"}</td>
                  </tr>
                  <tr>
                    <td>TOEFL</td>
                    <td>{application.certifications.scores.toefl || "-"}</td>
                  </tr>
                  <tr>
                    <td>PTE</td>
                    <td>{application.certifications.scores.pte || "-"}</td>
                  </tr>
                </tbody>
              </Table>

              {/* Work Experience */}
              <h5 className="mb-3 text-primary">Work Experience</h5>
              <Table bordered hover responsive>
                <tbody>
                  <tr>
                    <td>Has Experience</td>
                    <td>{application.workExperience.hasExperience? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td>Job Title</td>
                    <td>{application.workExperience.experience.jobTitle || "-"}</td>
                  </tr>
                  <tr>
                    <td>Company Name</td>
                    <td>{application.workExperience.experience.companyName || "-"}</td>
                  </tr>
                  <tr>
                    <td>Years</td>
                    <td>{application.workExperience.experience.years || "-"}</td>
                  </tr>
                  <tr>
                    <td>Related to Field</td>
                    <td>{application.workExperience.experience.isRelated || "-"}</td>
                  </tr>
                </tbody>
              </Table>

              {/* Financial Info */}
              <h5 className="mb-3 text-primary">Financial Information</h5>
              <Table bordered hover responsive>
                <tbody>
                  <tr>
                    <td>Estimated Budget</td>
                    <td>{application.financialInformation.estimatedBudget}</td>
                  </tr>
                  <tr>
                    <td>Source of Funding</td>
                    <td>{application.financialInformation.sourceOfFunding}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationDetails;
