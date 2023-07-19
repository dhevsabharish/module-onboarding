import { useState } from "react";
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
    moduleURLs: {
      type: "array",
      title: "Module URLs",
      items: {
        type: "object",
        title: "Module URL",
        properties: {
          categoryNames: {
            type: "array",
            title: "Category Names",
            items: {
              type: "string",
            },
          },
          url: {
            type: "string",
            title: "URL",
          },
        },
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
          examples: ["TextField", "Dropdown", "TextArea"],
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
  const { value = [], onChange, label, placeholder } = props;
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
      label={label}
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      fullWidth
    />
  );
};

const customValidate = (formData, errors) => {
  const categories = formData.categories.map((category) => category.name);
  const moduleURLs = formData.moduleURLs;

  moduleURLs.forEach((moduleURL, index: number) => {
    moduleURL.categoryNames.forEach((categoryName) => {
      if (!categories.includes(categoryName)) {
        errors.moduleURLs[index].categoryNames.addError(
          `Category ${categoryName} not found in categories`
        );
      }
    });
  });

  categories.forEach((category, catIndex) => {
    const categoryValues = formData.categories.find(
      (c) => c.name === category
    ).values;
    const subcategories = formData.categories.find(
      (c) => c.name === category
    ).subcategories;
    subcategories.forEach((subcategory, subIndex) => {
      if (!categoryValues.includes(subcategory.name)) {
        errors.categories[catIndex].subcategories[subIndex].name.addError(
          `Subcategory ${subcategory.name} not found in category ${category}`
        );
      }
    });
  });

  return errors;
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
  moduleURLs: {
    items: {
      categoryNames: {
        label: "Category Names",
        "ui:widget": CustomValuesWidget,
        "ui:placeholder": "Enter comma-separated list of category names",
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
        label: "Category Values",
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
            label: "Configurations",
            "ui:widget": CustomValuesWidget,
            "ui:placeholder": "Enter comma-separated list of configurations",
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
        customValidate={customValidate}
        // liveValidate
      />
    </div>
  );
};

export default OnboardingForm;
