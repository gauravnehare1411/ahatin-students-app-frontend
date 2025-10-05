import React, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

export default function Certifications({ nextStep, prevStep }) {
  const [hasCertifications, setHasCertifications] = useState("");
  const [scores, setScores] = useState({
    ielts: "",
    toefl: "",
    pte: ""
  });

  const handleScoreChange = (field, value) => {
    setScores({ ...scores, [field]: value });
  };

  return (
    <Card>
      <Card.Body>
        <h3>Certifications & Test Scores</h3>

        <Form.Group className="mb-3">
          <Form.Label>Do you have certifications?</Form.Label>
          <Form.Select
            value={hasCertifications}
            onChange={(e) => setHasCertifications(e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Select>
        </Form.Group>

        {hasCertifications === "yes" && (
          <>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>IELTS Score</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter IELTS score"
                  value={scores.ielts}
                  onChange={(e) => handleScoreChange("ielts", e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Label>TOEFL Score</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter TOEFL score"
                  value={scores.toefl}
                  onChange={(e) => handleScoreChange("toefl", e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Label>PTE Score</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter PTE score"
                  value={scores.pte}
                  onChange={(e) => handleScoreChange("pte", e.target.value)}
                />
              </Col>
            </Row>
          </>
        )}

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
