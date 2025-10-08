import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useFormStore } from "../../../store/formStore";
import { toast } from "react-toastify";

export default function WorkExperience({ nextStep, prevStep }) {
  const { formData, setWorkExperience } = useFormStore();

  const [hasExperience, setHasExperience] = useState(formData.workExperience.hasExperience || "");
  const [experience, setExperience] = useState(
    formData.workExperience.experience || {
      jobTitle: "",
      isRelated: "",
      companyName: "",
      years: ""
    });

  const handleChange = (field, value) => {
    setExperience({ ...experience, [field]: value });
  };

  const handleSubmit = () => {
    if (!hasExperience) {
      toast.error("Please fill the required fields");
      return
    }
    
    setWorkExperience({hasExperience, experience});
    console.log(useFormStore.getState().formData);

    nextStep();
  }

  return (
    <Card>
      <Card.Body>
        <h3>Work Experience</h3>

        <Form.Group className="mb-3">
          <Form.Label>Do you have any work experience? <span style={{color:"red"}}>*</span></Form.Label>
          <Form.Select
            value={hasExperience}
            onChange={(e) => setHasExperience(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>

        {hasExperience === "Yes" && (
          <>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job title"
                  value={experience.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Label>Is it related to further study?</Form.Label>
                <Form.Select
                  value={experience.isRelated}
                  onChange={(e) => handleChange("isRelated", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  value={experience.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter years"
                  value={experience.years}
                  onChange={(e) => handleChange("years", e.target.value)}
                />
              </Col>
            </Row>
          </>
        )}

        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={prevStep}>
            Previous
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit & Next
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
