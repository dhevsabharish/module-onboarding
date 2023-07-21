import { RJSFSchema } from "@rjsf/utils";

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
                subcatName: {
                  type: "string",
                  title: "Subcategory Name",
                },
                parentCatVal: {
                  type: "string",
                  title: "Parent Category Value",
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

export default schema;