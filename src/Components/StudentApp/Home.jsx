import React, { useState } from 'react';
import EducationalBackground from './ApplicationForm/Educational';
import { Container, Card, Nav } from "react-bootstrap";
import StudyPreferences from './ApplicationForm/StudyPreferences';
import Certifications from './ApplicationForm/Certifications';
import WorkExperience from './ApplicationForm/WorkExperience';
import FinancialInformation from './ApplicationForm/FinancialInformation';

export default function Home() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EducationalBackground nextStep={nextStep} />;
      case 2:
        return <StudyPreferences nextStep={nextStep} prevStep={prevStep}/>
      case 3:
        return <Certifications nextStep={nextStep} prevStep={prevStep} />
      case 4:
        return <WorkExperience nextStep={nextStep} prevStep={prevStep} />
      default:
        return <FinancialInformation prevStep={prevStep} />;
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <Nav variant="tabs" activeKey={step}>
            <Nav.Item>
              <Nav.Link onClick={() => setStep(1)} active={step === 1}>
                Educational Background
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setStep(2)} active={step === 2}>
                Study Preferences
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setStep(3)} active={step === 3}>
                Certifications
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setStep(4)} active={step === 4}>
                Work Experience
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setStep(5)} active={step === 5}>
                Financial Information
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>{renderStep()}</Card.Body>
      </Card>
    </Container>
  );
}
