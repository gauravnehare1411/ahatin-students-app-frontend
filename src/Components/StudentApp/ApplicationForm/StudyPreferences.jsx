import React, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

const degreeOptions = ["UG", "PG", "PhD", "Diploma"];

export default function StudyPreferences({ nextStep, prevStep }) {
  const [preferences, setPreferences] = useState({
    preferredCountry: "",
    preferredCourse: "",
    preferredIntakeMonth: "",
    preferredIntakeYear: "",
    degreeLevel: "",
    preferredUniversities: ""
  });

  const handleChange = (field, value) => {
    setPreferences({ ...preferences, [field]: value });
  };

  return (
    <Card>
      <Card.Body>
        <h3>Study Preferences</h3>
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Preferred Country</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter preferred country"
                    value={preferences.preferredCountry}
                    onChange={(e) => handleChange("preferredCountry", e.target.value)}
                />
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Preferred Course/Field of Study</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter preferred course or field"
                    value={preferences.preferredCourse}
                    onChange={(e) => handleChange("preferredCourse", e.target.value)}
                />
                </Form.Group>
            </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Preferred Intake Month</Form.Label>
            <Form.Control
              type="text"
              placeholder="Month"
              value={preferences.preferredIntakeMonth}
              onChange={(e) => handleChange("preferredIntakeMonth", e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Preferred Intake Year</Form.Label>
            <Form.Control
              type="text"
              placeholder="Year"
              value={preferences.preferredIntakeYear}
              onChange={(e) => handleChange("preferredIntakeYear", e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
            <Form.Label>Degree Level Interested In</Form.Label>
            <Form.Select
                value={preferences.degreeLevel}
                onChange={(e) => handleChange("degreeLevel", e.target.value)}
            >
                <option value="">Select Degree Level</option>
                {degreeOptions.map((deg) => (
                <option key={deg} value={deg}>
                    {deg}
                </option>
                ))}
            </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Preferred Universities (if any)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter universities separated by commas"
            value={preferences.preferredUniversities}
            onChange={(e) => handleChange("preferredUniversities", e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={prevStep}>
            Previous
          </Button>
          <Button variant="primary" onClick={nextStep}>
            Next
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
