import { UiSchema } from "@rjsf/utils";
import CustomValuesWidget from "./customValuesWidget";

const uiSchema: UiSchema = {
  moduleName: {
    "ui:autofocus": true,
    "ui:emptyValue": "",
  },
  protocol: {
    "ui:emptyValue": "",
  },
  testCaseFields: {
    items: {
      name: {
        "ui:emptyValue": "",
      },
      type: {
        "ui:emptyValue": "",
      },
      "ui:order": ["name", "type", "DropdownValues", "*",  "description", "required"],
      DropdownValues: {
        "ui:widget": CustomValuesWidget,
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
      // subcategories: {
      //   "ui:options": {
      //     addable: true,
      //     orderable: true,
      //     removable: true,
      //   },
      //   items: {
      //     subcatName: {
      //       "ui:placeholder": "Enter subcategory name",
      //     },
      //     parentCatVal: {
      //       "ui:placeholder": "Enter parent category value",
      //     },
      //     configurations: {
      //       label: "Configurations",
      //       "ui:widget": CustomValuesWidget,
      //       "ui:placeholder": "Enter comma-separated list of configurations",
      //     },
      //   },
      // },
    },
  },
};

export default uiSchema;