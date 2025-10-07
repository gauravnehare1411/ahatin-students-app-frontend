import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Table, Card, Spinner, ListGroup, Badge } from "react-bootstrap";
import api from "../../../api";

const ApplicationDetails = () => {
  const { application_id } = useParams();
  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState("Submitted");

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

  if (!application) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const steps = ["Submitted", "Under Review", "Accepted", "Rejected"];

  const getStatusColor = (step) => {
  const stepIndex = steps.indexOf(step);
  const currentIndex = steps.indexOf(status);

  if (status === "Rejected") {
    if (step === "Rejected") return "danger";
    if (step === "Accepted") return "secondary";
    return stepIndex < currentIndex ? "success" : "secondary";
  }

  if (status === "Accepted") {
    if (step === "Accepted") return "success";
    return stepIndex < currentIndex ? "success" : "secondary";
  }

  if (stepIndex < currentIndex) return "success";
  if (stepIndex === currentIndex) return "primary";
  return "secondary";
};

  return (
    <Container fluid className="p-4">
      <Row>
        {/* LEFT SIDE: Application Details */}
        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <strong>Application Details</strong>
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
                    <td>IELTS</td>
                    <td>{application.certifications.scores.ielts}</td>
                  </tr>
                  <tr>
                    <td>TOEFL</td>
                    <td>{application.certifications.scores.toefl}</td>
                  </tr>
                  <tr>
                    <td>PTE</td>
                    <td>{application.certifications.scores.pte}</td>
                  </tr>
                </tbody>
              </Table>

              {/* Work Experience */}
              <h5 className="mb-3 text-primary">Work Experience</h5>
              <Table bordered hover responsive>
                <tbody>
                  <tr>
                    <td>Job Title</td>
                    <td>{application.workExperience.experience.jobTitle}</td>
                  </tr>
                  <tr>
                    <td>Company Name</td>
                    <td>{application.workExperience.experience.companyName}</td>
                  </tr>
                  <tr>
                    <td>Years</td>
                    <td>{application.workExperience.experience.years}</td>
                  </tr>
                  <tr>
                    <td>Related to Field</td>
                    <td>{application.workExperience.experience.isRelated}</td>
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

        {/* RIGHT SIDE: Application Tracker */}
        <Col md={4}>
            <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
                <strong>Application Tracker</strong>
            </Card.Header>
            <ListGroup variant="flush">
                {steps.map((step, index) => {
                const statusColor = getStatusColor(step);
                const colors = {
                    success: { bg: "green", text: "white" },
                    primary: { bg: "#007bff", text: "white" },
                    secondary: { bg: "lightgray", text: "black" },
                    danger: { bg: "#dc3545", text: "white" }
                };
                
                const currentColor = colors[statusColor] || colors.secondary;

                return (
                    <ListGroup.Item key={step} className="d-flex align-items-center mb-2">
                    <div
                        style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: currentColor.bg,
                        color: currentColor.text,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "10px",
                        fontWeight: "bold",
                        }}
                    >
                        {index + 1}
                    </div>
                    <span>{step}</span>
                    </ListGroup.Item>
                );
                })}
            </ListGroup>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationDetails;
