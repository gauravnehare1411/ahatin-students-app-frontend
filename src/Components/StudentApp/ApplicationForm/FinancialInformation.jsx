import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const fundingOptions = ["Self", "Parents", "Loan", "Scholarship", "Sponsor"];

export default function FinancialInformation({ prevStep, nextStep }) {
  const [finance, setFinance] = useState({
    estimatedBudget: "",
    sourceOfFunding: ""
  });

  const handleChange = (field, value) => {
    setFinance({ ...finance, [field]: value });
  };

  return (
    <Card>
      <Card.Body>
        <h3>Financial Information</h3>

        <Form.Group className="mb-3">
          <Form.Label>Estimated Budget (per year)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter estimated budget"
            value={finance.estimatedBudget}
            onChange={(e) => handleChange("estimatedBudget", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Source of Funding</Form.Label>
          <Form.Select
            value={finance.sourceOfFunding}
            onChange={(e) => handleChange("sourceOfFunding", e.target.value)}
          >
            <option value="">Select</option>
            {fundingOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={prevStep}>
            Previous
          </Button>
          <Button variant="primary">
            Submit
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
