import "./onboardingform.css";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import schema from "./schema";
import uiSchema from "./uiSchema";
import customValidate from "./customValidate";

const OnboardingForm = () => {
  const onSubmit = (data) => {
    console.log("Data submitted: ", data.formData);
  };

  return (
    <div className="onboarding-form">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        validator={validator}
        customValidate={customValidate}
      />
    </div>
  );
};

export default OnboardingForm;
