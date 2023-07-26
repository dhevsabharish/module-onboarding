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

  const onSubmit = async (data) => {
    console.log(data.formData);
    try {
      await axios.post("http://localhost:8080/api/modules", data.formData);
      alert("Form submitted successfully!");
      setFormData({});
    } catch (error) {
      alert("Form submission failed.");
    }
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
        className="formComp"
      />
    </div>
  );
};

export default OnboardingForm;
