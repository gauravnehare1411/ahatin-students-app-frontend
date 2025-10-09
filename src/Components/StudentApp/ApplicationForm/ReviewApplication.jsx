import React, { useState } from "react";
import { Card, Table, Button, Form, Row, Col } from "react-bootstrap";
import { useFormStore } from "../../../store/formStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

export default function ReviewApplication() {
  const { formData, resetForm } = useFormStore();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const handleFinalSubmit = async () => {
    if (!confirmed) {
      toast.error("Please confirm before submitting");
      return;
    }

    try {
      const response = await api.post("/submit-application", formData);
      toast.success(response.data.message);
      resetForm();
      navigate("/");
    } catch (error) {
      toast.error("Error submitting application");
      console.error(error);
    }
  };

  const tableStyle = {
    tableLayout: "fixed",
    width: "100%",
    wordWrap: "break-word",
  };

  const cellStyle = {
    width: "50%",
    verticalAlign: "middle",
  };

  return (
    <Card>
      <Card.Body>
        <h3 className="mb-4">Review Your Application</h3>
        <p>Please review your details below before final submission.</p>

        {/* EDUCATIONAL DETAILS */}
        <Card className="mb-4">
          <Card.Header><strong>Educational Details</strong></Card.Header>
          <Card.Body>
            {formData.educational?.highestQualification ? (
              <Table bordered responsive style={tableStyle}>
                <tbody>
                  {Object.entries(formData.educational.highestQualification).map(([key, value]) => (
                    <tr key={key}>
                      <td style={cellStyle} className="text-capitalize fw-semibold">{key}</td>
                      <td style={cellStyle}>{value || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No educational details available.</p>
            )}
          </Card.Body>
        </Card>

        {/* STUDY PREFERENCES */}
        <Card className="mb-4">
          <Card.Header><strong>Study Preferences</strong></Card.Header>
          <Card.Body>
            {formData.studyPreferences ? (
              <Table bordered responsive style={tableStyle}>
                <tbody>
                  {Object.entries(formData.studyPreferences).map(([key, value]) => (
                    <tr key={key}>
                      <td style={cellStyle} className="text-capitalize fw-semibold">{key}</td>
                      <td style={cellStyle}>{value || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No study preferences available.</p>
            )}
          </Card.Body>
        </Card>

        {/* CERTIFICATIONS */}
        <Card className="mb-4">
          <Card.Header><strong>Certifications</strong></Card.Header>
          <Card.Body>
            <Table bordered responsive style={tableStyle}>
              <tbody>
                <tr>
                  <td style={cellStyle} className="fw-semibold">Has Certifications</td>
                  <td style={cellStyle}>{formData.certifications.hasCertifications? "Yes" : "No"}</td>
                </tr>
                {formData.certifications?.scores && (
                  <>
                    {Object.entries(formData.certifications.scores).map(([key, value]) => (
                      <tr key={key}>
                        <td style={cellStyle} className="text-uppercase fw-semibold">{key}</td>
                        <td style={cellStyle}>{value || "-"}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* WORK EXPERIENCE */}
        <Card className="mb-4">
          <Card.Header><strong>Work Experience</strong></Card.Header>
          <Card.Body>
            <Table bordered responsive style={tableStyle}>
              <tbody>
                <tr>
                  <td style={cellStyle} className="fw-semibold">Has Experience</td>
                  <td style={cellStyle}>{formData.workExperience.hasExperience? "Yes" : "No"}</td>
                </tr>
                {formData.workExperience?.experience && (
                  <>
                    {Object.entries(formData.workExperience.experience).map(([key, value]) => (
                      <tr key={key}>
                        <td style={cellStyle} className="text-capitalize fw-semibold">{key}</td>
                        <td style={cellStyle}>{value || "-"}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* FINANCIAL INFORMATION */}
        <Card className="mb-4">
          <Card.Header><strong>Financial Information</strong></Card.Header>
          <Card.Body>
            {formData.financialInformation &&
            Object.keys(formData.financialInformation).length > 0 ? (
              <Table bordered responsive style={tableStyle}>
                <tbody>
                  {Object.entries(formData.financialInformation).map(([key, value]) => (
                    <tr key={key}>
                      <td style={cellStyle} className="text-capitalize fw-semibold">{key}</td>
                      <td style={cellStyle}>{value || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No financial information filled.</p>
            )}
          </Card.Body>
        </Card>

        {/* CONFIRMATION CHECKBOX */}
        <Form.Check
          type="checkbox"
          label="I confirm that the above information is correct"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="my-3"
        />

        {/* ACTION BUTTONS */}
        <Row>
          <Col className="text-start">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleFinalSubmit}>
              Confirm & Submit
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}