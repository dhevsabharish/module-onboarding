import "./onboardingform.css";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import schema from "./schema";
import uiSchema from "./uiSchema";
import customValidate from "./customValidate";
import axios from "axios";
import { useState } from "react";

const OnboardingForm = () => {
  const [formData, setFormData] = useState({});

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8080/api/modules", data.formData)
      .then(() => {
        alert("Form submitted successfully!");
        setFormData({});
      })
      .catch(() => {
        alert("Form submission failed.");
      });
  };

  return (
    <div className="onboarding-form">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        validator={validator}
        customValidate={customValidate}
        formData={formData}
      />
    </div>
  );
};

export default OnboardingForm;
