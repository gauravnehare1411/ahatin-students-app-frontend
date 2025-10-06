import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useFormStore } from "../formStore";

const qualificationOptions = ["Master's", "Bachelor's", "12th", "10th"];

const EducationalBackground = ({ nextStep }) => {
  const { formData, setEducational } = useFormStore();

  const [highestQualification, setHighestQualification] = useState(
    formData.educational.highestQualification || {
      type: "",
      school: "",
      board: "",
      year: "",
      percentage: ""
    }
  );

  const [previousQualifications, setPreviousQualifications] = useState(
    formData.educational.previousQualifications || []
  );

  const addQualification = () => {
    setPreviousQualifications([
      ...previousQualifications,
      { type: "", school: "", board: "", year: "", percentage: "" }
    ]);
  };

  const handleHighestChange = (field, value) => {
    setHighestQualification({ ...highestQualification, [field]: value });
  };

  const handleQualificationChange = (index, field, value) => {
    const newQualifications = [...previousQualifications];
    newQualifications[index][field] = value;
    setPreviousQualifications(newQualifications);
  };

  const removeQualification = (index) => {
    const newQualifications = [...previousQualifications];
    newQualifications.splice(index, 1);
    setPreviousQualifications(newQualifications);
  };

  const handleSubmit = () => {
    setEducational({highestQualification, previousQualifications});

    console.log(useFormStore.getState().formData);

    if (nextStep) {
      nextStep();
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <h3>Educational Background</h3>

          <h5>Highest Qualification</h5>
          <Card className="mb-3 p-2">
            <Row className="align-items-center">
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Select
                    value={highestQualification.type}
                    onChange={(e) => handleHighestChange("type", e.target.value)}
                  >
                    <option value="">Select Qualification</option>
                    {qualificationOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Control
                    placeholder="School/College"
                    value={highestQualification.school}
                    onChange={(e) => handleHighestChange("school", e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Control
                    placeholder="Board/University"
                    value={highestQualification.board}
                    onChange={(e) => handleHighestChange("board", e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    placeholder="Year of Passing"
                    value={highestQualification.year}
                    onChange={(e) => handleHighestChange("year", e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Control
                    placeholder="Percentage/CGPA"
                    value={highestQualification.percentage}
                    onChange={(e) => handleHighestChange("percentage", e.target.value)}
                  />
                </Col>
              </Row>
            </Row>
          </Card>

          <h5>Previous Qualifications</h5>
          {previousQualifications.map((qual, index) => (
            <Card key={index} className="mb-2 p-2">
              <Row className="align-items-center">
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Select
                      value={qual.type}
                      onChange={(e) => handleQualificationChange(index, "type", e.target.value)}
                    >
                      <option value="">Select Qualification</option>
                      {qualificationOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      placeholder="School/College"
                      value={qual.school}
                      onChange={(e) => handleQualificationChange(index, "school", e.target.value)}
                    />
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Control
                      placeholder="Board/University"
                      value={qual.board}
                      onChange={(e) => handleQualificationChange(index, "board", e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      placeholder="Year of Passing"
                      value={qual.year}
                      onChange={(e) => handleQualificationChange(index, "year", e.target.value)}
                    />
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col>
                    <Form.Control
                      placeholder="Percentage/CGPA"
                      value={qual.percentage}
                      onChange={(e) => handleQualificationChange(index, "percentage", e.target.value)}
                    />
                  </Col>
                </Row>
                <Col>
                  <Button variant="danger" onClick={() => removeQualification(index)}>Remove</Button>
                </Col>
              </Row>
            </Card>
          ))}

          <Button variant="secondary" onClick={addQualification} className="mt-2">
            Add Previous Qualification
          </Button>

          <div className="mt-4">
            <Button onClick={handleSubmit}>Submit & Next</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EducationalBackground;
