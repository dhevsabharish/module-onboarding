import { RJSFSchema } from "@rjsf/utils";

const schema: RJSFSchema = {
  title: "Module Onboarding",
  description: "A Simple Form for developers to simplify Module Onboarding",
  type: "object",
  properties: {
    moduleName: {
      type: "string",
      title: "Module Name",
    },
    protocol: {
      type: "string",
      title: "Module Protocol",
      enum: ["HTTP", "gRPC", "HTTP Session"],
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
          // subcategories: {
          //   type: "array",
          //   title: "Subcategories",
          //   items: {
          //     type: "object",
          //     title: "Subcategory",
          //     properties: {
          //       subcatName: {
          //         type: "string",
          //         title: "Subcategory Name",
          //       },
          //       parentCatVal: {
          //         type: "string",
          //         title: "Parent Category Value",
          //       },
          //       configurations: {
          //         type: "array",
          //         title: "Configurations",
          //         items: {
          //           type: "string",
          //         },
          //       },
          //     },
          //   },
          // },
        },
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
    // testCaseFields: {
    //   type: "array",
    //   title: "Custom Testcase Fields",
    //   items: {
    //     $ref: "#/definitions/testCaseField",
    //   },
    //   minItems: 8
    // },
  },
  required: ["moduleName", "protocol"],
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
          enum: ["TextField", "Dropdown", "TextArea"],
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
      dependencies: {
        type: {
          oneOf: [
            {
              properties: {
                type: {
                  const: "Dropdown",
                },
                DropdownValues: {
                  type: "array",
                  title: "Dropdown Values",
                  items: {
                    type: "string",
                  }
                }
              },
            },
            {
              properties: {
                type: {
                  const: "TextField",
                }
              }
            },
            {
              properties: {
                type: {
                  const: "TextArea",
                }
              }
            }
          ]
        }
      },
    },
  },
  dependencies: {
    protocol: {
      oneOf: [
        {
          properties: {
            protocol: {
              const: "HTTP",
            },
            testCaseFields: {
              type: "array",
              title: "Custom Testcase Fields",
              items: {
                $ref: "#/definitions/testCaseField",
              },
              default: [
                {
                  name: "HTTP Method",
                  type: "Dropdown",
                  DropdownValues: ["GET", "POST", "PUT", "DELETE", "PATCH"],
                  required: true,
                },
                {
                  name: "HTTP URL Path",
                  type: "TextField",
                  required: true,
                },
                {
                  name: "Request Headers",
                  type: "TextArea",
                  required: true,
                },
                {
                  name: "Request Body",
                  type: "TextArea",
                  required: false,
                },
                {
                  name: "Expected Response Code",
                  type: "TextField",
                  required: false,
                },
                {
                  name: "Expected Response",
                  type: "TextArea",
                  required: false,
                },
                {
                  name: "Expected Content Type",
                  type: "TextField",
                  required: false,
                },
                {
                  name: "Expected Buffer Length",
                  type: "TextField",
                  required: false,
                },
              ],
            },
          },
        },
        {
          properties: {
            protocol: {
              const: "HTTP Session",
            },
            testCaseFields: {
              type: "array",
              title: "Custom Testcase Fields",
              items: {
                $ref: "#/definitions/testCaseField",
              },
              default: [
                {
                  name: "HTTP Method",
                  type: "Dropdown",
                  DropdownValues: ["GET", "POST", "PUT", "DELETE", "PATCH"],
                  required: true,
                },
                {
                  name: "HTTP URL Path",
                  type: "TextField",
                  required: true,
                },
                {
                  name: "Request Headers",
                  type: "TextArea",
                  required: true,
                },
                {
                  name: "Request Body",
                  type: "TextArea",
                  required: false,
                },
                {
                  name: "Expected Response Code",
                  type: "TextField",
                  required: false,
                },
                {
                  name: "Expected Response",
                  type: "TextArea",
                  required: false,
                },
                {
                  name: "Expected Content Type",
                  type: "TextField",
                  required: false,
                },
                {
                  name: "Expected Buffer Length",
                  type: "TextField",
                  required: false,
                },
              ],
            },
          },
        },
        {
          properties: {
            protocol: {
              const: "gRPC",
            },
            testCaseFields: {
              type: "array",
              title: "Custom Testcase Fields",
              items: {
                $ref: "#/definitions/testCaseField",
              },
              default: [
                {
                  "name": "Service Method",
                  "type": "TextField",
                  "required": true
                },
                {
                  "name": "Request Message",
                  "type": "TextArea",
                  "required": true
                },
                {
                  "name": "Response Message",
                  "type": "TextArea",
                  "required": true
                },
                {
                  "name": "RPC Endpoint",
                  "type": "TextField",
                  "required": true
                },
                {
                  "name": "Serialization and Deserialization",
                  "type": "Dropdown",
                  "DropdownValues": ["Protobuf", "JSON", "XML", "YAML", "MessagePack", "Thrift", "Avro"],
                  "required": true
                },
                {
                  "name": "SSL/TLS",
                  "type": "Dropdown",
                  "DropdownValues": ["Enabled", "Disabled", "Optional", "Required", "Custom Certificate"],
                  "required": false
                },
                {
                  "name": "Error Handling",
                  "type": "TextField",
                  "required": false
                },
                {
                  "name": "Metadata",
                  "type": "TextArea",
                  "required": false
                }
              ]
            }
          },
        },
      ],
    },
  },
};

export default schema;