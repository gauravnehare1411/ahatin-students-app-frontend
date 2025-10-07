import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useFormStore } from "../../../store/formStore";
import { toast } from "react-toastify";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

const fundingOptions = ["Self", "Parents", "Loan", "Scholarship", "Sponsor"];

export default function FinancialInformation({ prevStep }) {
  const { formData, setFinancialInformation, resetForm } = useFormStore();

  const navigate = useNavigate();

  const [finance, setFinance] = useState(
    formData.financialInformation || {
      estimatedBudget: "",
      sourceOfFunding: ""
    });

  const handleChange = (field, value) => {
    setFinance({ ...finance, [field]: value });
  };

  const handleSubmit = async () => {
    setFinancialInformation(finance);
    const finalData = useFormStore.getState().formData;

    try {
      const response = await api.post(
        "/submit-application",
        finalData
      );
      toast.success(response.data.message);
      resetForm();
      navigate('/');
    } catch (error) {
      toast.error("Error submitting application");
      console.error(error);
    }
  }

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
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
