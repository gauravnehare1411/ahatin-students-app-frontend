import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import api from "../../../api";
import { toast } from "react-toastify";

const EditApplication = () => {
  const { application_id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const response = await api.get(`/applications/${application_id}`);
        setApplication(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching application:", error);
        setLoading(false);
      }
    }
    fetchApplication();
  }, [application_id]);

  const handleChange = (section, field, value, subfield = null) => {
    setApplication((prev) => {
      const updated = { ...prev };
      if (subfield) updated[section][field][subfield] = value;
      else updated[section][field] = value;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const updatedData = {
        ...application,
        updated_at: new Date().toISOString(),
      };
      await api.put(`/admin/application/${application_id}/edit`, updatedData);
      toast.success("Application updated successfully!");
      navigate(`/admin/applications/${application_id}`);
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container fluid className="p-4">
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <strong>Edit Application</strong>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* --- Educational Details --- */}
            <h5 className="mb-3 text-primary">Educational Details</h5>

            {/* Highest Qualification */}
            <Row className="mb-3">
            <Col md={6}>
                <Form.Group>
                <Form.Label>Highest Qualification</Form.Label>
                <Form.Select
                    value={application.educational.highestQualification.type || ""}
                    onChange={(e) =>
                    handleChange("educational", "highestQualification", e.target.value, "type")
                    }
                >
                    <option value="">Select Qualification</option>
                    <option value="Master's">Master's</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="12th">12th</option>
                    <option value="10th">10th</option>
                </Form.Select>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group>
                <Form.Label>School/College</Form.Label>
                <Form.Control
                    type="text"
                    value={application.educational.highestQualification.school || ""}
                    onChange={(e) =>
                    handleChange("educational", "highestQualification", e.target.value, "school")
                    }
                />
                </Form.Group>
            </Col>
            </Row>

            <Row className="mb-3">
            <Col md={6}>
                <Form.Group>
                <Form.Label>Board/University</Form.Label>
                <Form.Control
                    type="text"
                    value={application.educational.highestQualification.board || ""}
                    onChange={(e) =>
                    handleChange("educational", "highestQualification", e.target.value, "board")
                    }
                />
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group>
                <Form.Label>Year of Passing</Form.Label>
                <Form.Control
                    type="text"
                    value={application.educational.highestQualification.year || ""}
                    onChange={(e) =>
                    handleChange("educational", "highestQualification", e.target.value, "year")
                    }
                />
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group>
                <Form.Label>Percentage/CGPA</Form.Label>
                <Form.Control
                    type="text"
                    value={application.educational.highestQualification.percentage || ""}
                    onChange={(e) =>
                    handleChange("educational", "highestQualification", e.target.value, "percentage")
                    }
                />
                </Form.Group>
            </Col>
            </Row>

            {/* Previous Qualifications */}
            <h5 className="mt-4 mb-2 text-primary">Previous Qualifications</h5>

            {application.educational.previousQualifications &&
            application.educational.previousQualifications.map((qual, index) => (
                <Card key={index} className="mb-3 p-3 border">
                <Row className="mb-3">
                    <Col md={6}>
                    <Form.Group>
                        <Form.Label>Qualification</Form.Label>
                        <Form.Select
                        value={qual.type}
                        onChange={(e) => {
                            const updated = [...application.educational.previousQualifications];
                            updated[index].type = e.target.value;
                            setApplication({
                            ...application,
                            educational: { ...application.educational, previousQualifications: updated },
                            });
                        }}
                        >
                        <option value="">Select Qualification</option>
                        <option value="Master's">Master's</option>
                        <option value="Bachelor's">Bachelor's</option>
                        <option value="12th">12th</option>
                        <option value="10th">10th</option>
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group>
                        <Form.Label>School/College</Form.Label>
                        <Form.Control
                        type="text"
                        value={qual.school}
                        onChange={(e) => {
                            const updated = [...application.educational.previousQualifications];
                            updated[index].school = e.target.value;
                            setApplication({
                            ...application,
                            educational: { ...application.educational, previousQualifications: updated },
                            });
                        }}
                        />
                    </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                    <Form.Group>
                        <Form.Label>Board/University</Form.Label>
                        <Form.Control
                        type="text"
                        value={qual.board}
                        onChange={(e) => {
                            const updated = [...application.educational.previousQualifications];
                            updated[index].board = e.target.value;
                            setApplication({
                            ...application,
                            educational: { ...application.educational, previousQualifications: updated },
                            });
                        }}
                        />
                    </Form.Group>
                    </Col>
                    <Col md={4}>
                    <Form.Group>
                        <Form.Label>Year of Passing</Form.Label>
                        <Form.Control
                        type="text"
                        value={qual.year}
                        onChange={(e) => {
                            const updated = [...application.educational.previousQualifications];
                            updated[index].year = e.target.value;
                            setApplication({
                            ...application,
                            educational: { ...application.educational, previousQualifications: updated },
                            });
                        }}
                        />
                    </Form.Group>
                    </Col>
                    <Col md={4}>
                    <Form.Group>
                        <Form.Label>Percentage/CGPA</Form.Label>
                        <Form.Control
                        type="text"
                        value={qual.percentage}
                        onChange={(e) => {
                            const updated = [...application.educational.previousQualifications];
                            updated[index].percentage = e.target.value;
                            setApplication({
                            ...application,
                            educational: { ...application.educational, previousQualifications: updated },
                            });
                        }}
                        />
                    </Form.Group>
                    </Col>
                </Row>

                <div className="text-end">
                    <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                        const updated = application.educational.previousQualifications.filter(
                        (_, i) => i !== index
                        );
                        setApplication({
                        ...application,
                        educational: { ...application.educational, previousQualifications: updated },
                        });
                    }}
                    >
                    Remove
                    </Button>
                </div>
                </Card>
            ))}

            <Button
            variant="secondary"
            className="mt-2"
            onClick={() => {
                const updated = [
                ...(application.educational.previousQualifications || []),
                { type: "", school: "", board: "", year: "", percentage: "" },
                ];
                setApplication({
                ...application,
                educational: { ...application.educational, previousQualifications: updated },
                });
            }}
            >
            Add Previous Qualification
            </Button>

            {/* --- Study Preferences --- */}
            <h5 className="mb-3 mt-4 text-primary">Study Preferences</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Preferred Country</Form.Label>
                  <Form.Control
                    type="text"
                    value={application.studyPreferences.preferredCountry || ""}
                    onChange={(e) => handleChange("studyPreferences", "preferredCountry", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Preferred Course</Form.Label>
                  <Form.Control
                    type="text"
                    value={application.studyPreferences.preferredCourse || ""}
                    onChange={(e) => handleChange("studyPreferences", "preferredCourse", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Intake Month</Form.Label>
                  <Form.Select
                    value={application.studyPreferences.preferredIntakeMonth || ""}
                    onChange={(e) =>
                      handleChange("studyPreferences", "preferredIntakeMonth", e.target.value)
                    }
                  >
                    <option value="">Select Month</option>
                    {[
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December",
                    ].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Intake Year</Form.Label>
                  <Form.Control
                    type="number"
                    value={application.studyPreferences.preferredIntakeYear || ""}
                    onChange={(e) =>
                      handleChange("studyPreferences", "preferredIntakeYear", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Degree Level</Form.Label>
                  <Form.Control
                    type="text"
                    value={application.studyPreferences.degreeLevel || ""}
                    onChange={(e) => handleChange("studyPreferences", "degreeLevel", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* --- Certifications --- */}
            <h5 className="mb-3 mt-4 text-primary">Certifications Scores</h5>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                    <Form.Label>Has Certifications</Form.Label>
                    <Form.Select
                    value={application.certifications.hasCertifications ? "Yes" : "No"}
                    onChange={(e) =>
                        handleChange(
                        "certifications",
                        "hasCertifications",
                        e.target.value === "Yes"
                        )
                    }
                    >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>IELTS</Form.Label>
                  <Form.Control
                    type="text"
                    value={application.certifications.scores.ielts || ""}
                    onChange={(e) => handleChange("certifications", "scores", e.target.value, "ielts")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>TOEFL</Form.Label>
                  <Form.Control
                    type="text"
                    value={application.certifications.scores.toefl || ""}
                    onChange={(e) => handleChange("certifications", "scores", e.target.value, "toefl")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>PTE</Form.Label>
                  <Form.Control
                    type="text"
                    value={application.certifications.scores.pte || ""}
                    onChange={(e) => handleChange("certifications", "scores", e.target.value, "pte")}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* --- Work Experience --- */}
            <h5 className="mb-3 mt-4 text-primary">Work Experience</h5>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                    <Form.Label>Has Experience</Form.Label>
                    <Form.Select
                    value={application.workExperience.hasExperience ? "Yes" : "No"}
                    onChange={(e) =>
                        handleChange(
                        "workExperience",
                        "hasExperience",
                        e.target.value === "Yes"
                        )
                    }
                    >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={application.workExperience.experience.jobTitle || ""}
                    onChange={(e) =>
                      handleChange("workExperience", "experience", e.target.value, "jobTitle")
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={application.workExperience.experience.companyName || ""}
                    onChange={(e) =>
                      handleChange("workExperience", "experience", e.target.value, "companyName")
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Years</Form.Label>
                  <Form.Control
                    type="number"
                    value={application.workExperience.experience.years || ""}
                    onChange={(e) =>
                      handleChange("workExperience", "experience", e.target.value, "years")
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Related to Field</Form.Label>
                  <Form.Select
                    value={application.workExperience.experience.isRelated || ""}
                    onChange={(e) =>
                      handleChange("workExperience", "experience", e.target.value, "isRelated")
                    }
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* --- Financial Info --- */}
            <h5 className="mb-3 mt-4 text-primary">Financial Information</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Estimated Budget (per year)</Form.Label>
                  <Form.Control
                    type="text"
                    value={application.financialInformation.estimatedBudget || ""}
                    onChange={(e) =>
                      handleChange("financialInformation", "estimatedBudget", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Source of Funding</Form.Label>
                  <Form.Control
                    type="text"
                    value={application.financialInformation.sourceOfFunding || ""}
                    onChange={(e) =>
                      handleChange("financialInformation", "sourceOfFunding", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end mt-4">
              <Button variant="secondary" className="mb-2 me-2" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="mb-2 me-2" disabled={updating}>
                {updating ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditApplication;
