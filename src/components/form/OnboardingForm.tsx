import React, { useState } from "react";
import "./onboardingform.css";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { TextField } from "@mui/material";

const schema: RJSFSchema = {
  title: "Module Onboarding",
  description: "A Simple Form for developers to simplify Module Onboarding",
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Module Name",
    },
    protocol: {
      type: "string",
      title: "Module Protocol",
      examples: ["http", "gRPC"],
    },
    categories: {
      type: "array",
      title: "Categories",
      items: {
        type: "object",
        title: "Category",
        properties: {
          name: {
            type: "string",
            title: "Category Name",
          },
          values: {
            type: "array",
            title: "Category Values",
            items: {
              type: "string",
            },
          },
          subcategories: {
            type: "array",
            title: "Subcategories",
            items: {
              type: "object",
              title: "Subcategory",
              properties: {
                name: {
                  type: "string",
                  title: "Name",
                },
                configurations: {
                  type: "array",
                  title: "Configurations",
                  items: {
                    type: "string",
                  },
                },
                moduleURLs: {
                  type: "array",
                  title: "Module URLs",
                  items: {
                    type: "string",
                    title: "Module URL",
                  },
                },
              },
            },
          },
        },
      },
    },
    testCaseFields: {
      type: "array",
      title: "Custom Testcase Fields",
      items: {
        $ref: "#/definitions/testCaseField",
      },
    },
  },
  required: ["name", "protocol"],
  definitions: {
    testCaseField: {
      type: "object",
      title: "Test Case Field",
      properties: {
        name: {
          type: "string",
          title: "Test Case Field Name",
        },
        type: {
          type: "string",
          title: "Test Case Field Type",
          examples: ["string", "number", "boolean", "date", "array", "object"],
        },
        description: {
          type: "string",
          title: "Test Case Field Description",
        },
        required: {
          type: "boolean",
          title: "Test Case Field Required or Not",
        },
      },
      required: ["name", "type", "required"],
    },
  },
};

const CustomValuesWidget = (props) => {
  const { value = [], onChange } = props;
  const [inputValue, setInputValue] = useState(value.join(", "));

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBlur = () => {
    const newValues = inputValue.split(",").map((v) => v.trim());
    onChange(newValues);
  };

  return (
    <TextField
      variant="outlined"
      label="Values"
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      fullWidth
    />
  );
};

const URLsInputBox = (props) => {
  const { value = [], onChange } = props;
  const [inputValue, setInputValue] = useState(value.join("\n"));

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBlur = () => {
    const newValues = inputValue.split("\n").map((v) => v.trim());
    onChange(newValues);
  };

  return (
    <TextField
      variant="outlined"
      label="URLs"
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      fullWidth
      multiline
      rows={6}
    />
  );
};

const uiSchema: UiSchema = {
  name: {
    "ui:autofocus": true,
    "ui:emptyValue": "",
  },
  protocol: {
    "ui:emptyValue": "",
  },
  testCaseFields: {
    items: {
      name: {
        "ui:autofocus": true,
        "ui:emptyValue": "",
      },
      type: {
        "ui:emptyValue": "",
      },
      description: {
        "ui:widget": "textarea",
      },
    },
  },
  categories: {
    "ui:options": {
      addable: true,
      orderable: true,
      removable: true,
    },
    items: {
      name: {
        "ui:placeholder": "Enter category name",
      },
      values: {
        "ui:widget": CustomValuesWidget,
        "ui:placeholder": "Enter comma-separated list of values",
      },
      subcategories: {
        "ui:options": {
          addable: true,
          orderable: true,
          removable: true,
        },
        items: {
          name: {
            "ui:placeholder": "Enter subcategory name",
          },
          configurations: {
            "ui:widget": CustomValuesWidget,
            "ui:placeholder": "Enter comma-separated list of configurations",
          },
          moduleURLs: {
            "ui:widget": URLsInputBox,
            "ui:placeholder": "Enter comma-separated list of Module URLs",
          },
        },
      },
    },
  },
};

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
      />
    </div>
  );
};

export default OnboardingForm;
