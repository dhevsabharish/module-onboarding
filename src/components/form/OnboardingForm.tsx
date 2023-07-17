import React, { useState } from "react";
import "./onboardingform.css";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";

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
              $ref: "#/definitions/category",
            },
          },
        },
        required: ["name"],
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
    category: {
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
            $ref: "#/definitions/category",
          },
        },
      },
      required: ["name"],
    },
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
        default: {
          type: "string",
          title: "Default Test Case Field Type",
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

const uiSchema: UiSchema = {
  name: {
    "ui:autofocus": true,
    "ui:emptyValue": "",
  },
  protocol: {
    "ui:emptyValue": "",
  },
  categories: {
    items: {
      name: {
        "ui:autofocus": true,
        "ui:emptyValue": "",
      },
      values: {
        items: {
          name: {
            "ui:autofocus": true,
            "ui:emptyValue": "",
          },
        },
      },
    },
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
      default: {
        "ui:emptyValue": "",
      },
      description: {
        "ui:widget": "textarea",
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
