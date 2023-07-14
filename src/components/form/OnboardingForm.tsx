import React, { useState } from "react";
import "./onboardingform.css";

const OnboardingForm = () => {
  const [moduleName, setModuleName] = useState("");
  const [moduleProtocol, setModuleProtocol] = useState("http");
  const [testCases, setTestCases] = useState([
    {
      name: "",
      description: "",
      type: "",
      required: false,
      defaultValue: "",
    },
  ]);
  const [categories, setCategories] = useState([
    {
      name: "",
      values: [{ name: "", values: [] }],
    },
  ]);

  const handleAddTestCase = () => {
    setTestCases([
      ...testCases,
      {
        name: "",
        description: "",
        type: "",
        required: false,
        defaultValue: "",
      },
    ]);
  };

  const handleAddCategory = () => {
    setCategories([
      ...categories,
      {
        name: "",
        values: [{ name: "", values: [] }],
      },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // print all form data to console
    console.log(moduleName);
    console.log(moduleProtocol);
    console.log(testCases);
    console.log(categories);
  };

  const handleReset = () => {
    setModuleName("");
    setModuleProtocol("http");
    setTestCases([
      {
        name: "",
        description: "",
        type: "",
        required: false,
        defaultValue: "",
      },
    ]);
    setCategories([
      {
        name: "",
        values: [{ name: "", values: [] }],
      },
    ]);
  };

  return (
    <div className="onboardingform">
      <form onSubmit={handleSubmit}>
        <label>
          Module Name:
          <input
            type="text"
            value={moduleName}
            onChange={(event) => setModuleName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Module Protocol:
          <select
            value={moduleProtocol}
            onChange={(event) => setModuleProtocol(event.target.value)}
          >
            <option value="http">http</option>
            <option value="gRPC">gRPC</option>
            {/* Add more options here */}
          </select>
        </label>
        <br />
        <label>
          Test Cases:
          {testCases.map((testCase, index) => (
            <div key={index}>
              <label>
                Test Case Name:
                <input
                  type="text"
                  value={testCase.name}
                  onChange={(event) => {
                    const newTestCases = [...testCases];
                    newTestCases[index].name = event.target.value;
                    setTestCases(newTestCases);
                  }}
                />
              </label>
              <br />
              <label>
                Test Case Description:
                <input
                  type="text"
                  value={testCase.description}
                  onChange={(event) => {
                    const newTestCases = [...testCases];
                    newTestCases[index].description = event.target.value;
                    setTestCases(newTestCases);
                  }}
                />
              </label>
              <br />
              <label>
                Test Case Type:
                <input
                  type="text"
                  value={testCase.type}
                  onChange={(event) => {
                    const newTestCases = [...testCases];
                    newTestCases[index].type = event.target.value;
                    setTestCases(newTestCases);
                  }}
                />
              </label>
              <br />
              <label>
                Required:
                <input
                  type="checkbox"
                  checked={testCase.required}
                  onChange={(event) => {
                    const newTestCases = [...testCases];
                    newTestCases[index].required = event.target.checked;
                    setTestCases(newTestCases);
                  }}
                />
              </label>
              <br />
              <label>
                Default Value:
                <input
                  type="text"
                  value={testCase.defaultValue}
                  onChange={(event) => {
                    const newTestCases = [...testCases];
                    newTestCases[index].defaultValue = event.target.value;
                    setTestCases(newTestCases);
                  }}
                />
              </label>
              <br />
            </div>
          ))}
          <button type="button" onClick={handleAddTestCase}>
            Add Test Case
          </button>
        </label>
        <br />
        <label>
          Categories:
          {categories.map((category, index) => (
            <div key={index}>
              <label>
                Category Name:
                <input
                  type="text"
                  value={category.name}
                  onChange={(event) => {
                    const newCategories = [...categories];
                    newCategories[index].name = event.target.value;
                    setCategories(newCategories);
                  }}
                />
              </label>
              <br />
              <label>
                Values:
                {category.values.map((value, valueIndex) => (
                  <div key={valueIndex}>
                    <label>
                      Value Name:
                      <input
                        type="text"
                        value={value.name}
                        onChange={(event) => {
                          const newCategories = [...categories];
                          newCategories[index].values[valueIndex].name =
                            event.target.value;
                          setCategories(newCategories);
                        }}
                      />
                    </label>
                    <br />
                    <label>
                      Sub-Values:
                      {value.values.map((subValue, subValueIndex) => (
                        <div key={subValueIndex}>
                          <label>
                            Sub-Value Name:
                            <input
                              type="text"
                              value={subValue.name}
                              onChange={(event) => {
                                const newCategories = [...categories];
                                newCategories[index].values[valueIndex].values[
                                  subValueIndex
                                ].name = event.target.value;
                                setCategories(newCategories);
                              }}
                            />
                          </label>
                          <br />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newCategories = [...categories];
                          newCategories[index].values[valueIndex].values.push({
                            name: "",
                            values: [],
                          });
                          setCategories(newCategories);
                        }}
                      >
                        Add Sub-Value
                      </button>
                    </label>
                    <br />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newCategories = [...categories];
                    newCategories[index].values.push({ name: "", values: [] });
                    setCategories(newCategories);
                  }}
                >
                  Add Value
                </button>
              </label>
              <br />
            </div>
          ))}
          <button type="button" onClick={handleAddCategory}>
            Add Category
          </button>
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default OnboardingForm;
