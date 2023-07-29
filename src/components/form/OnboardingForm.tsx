import "./onboardingform.css";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import schema from "./schema";
import uiSchema from "./uiSchema";
import customValidate from "./customValidate";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Button from "@mui/material/Button";
const apiUrl = import.meta.env.VITE_API_URL;

const OnboardingForm = () => {
  const [formData, setFormData] = useState({});
  const [addOrEdit, setAddOrEdit] = useState("Add");
  const [idToUpdate, setIdToUpdate] = useState("");

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data.formData);
    if (addOrEdit === "Add") {
      try {
        await axios.post(`${apiUrl}/api/modules`, data.formData);
        alert("Form submitted successfully!");
        setFormData({});
        navigate("/");
      } catch (error) {
        alert("Form submission failed.");
      }
    } else {
      try {
        await axios.put(`${apiUrl}/api/modules/${idToUpdate}`, data.formData);
        alert("Form updated successfully!");
        setFormData({});
        navigate("/");
      } catch (error) {
        alert("Form updation failed.");
      }
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state?.moduleToUpdate) {
      setAddOrEdit("Edit");
      setFormData(location.state.moduleToUpdate);
      setIdToUpdate(location.state.moduleToUpdate._id);
    }
  });

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
      >
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "10px" }}
        >
          {addOrEdit === "Add" ? "Add Module" : "Update Module"}
        </Button>
      </Form>
    </div>
  );
};

export default OnboardingForm;
