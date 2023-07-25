import React from "react";
import { useState } from "react";
import "./moduletable.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CategoryTable from "./CategoryTable";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function ModuleTable() {
  const [expandedRows, setExpandedRows] = useState<any>([]);
  const [checkedRows, setCheckedRows] = useState<any>([]);
  const [appName, setAppName] = useState<string>("");

  const handleAppnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(event.target.value);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    moduleName: string
  ) => {
    if (event.target.checked) {
      setCheckedRows([...checkedRows, moduleName]);
    } else {
      setCheckedRows(checkedRows.filter((row) => row !== moduleName));
    }
  };

  const handleGroupButtonClick = () => {
    console.log(appName);
    console.log(checkedRows);
  };

  const handleRowClick = (index) => {
    const isRowExpanded = expandedRows.includes(index);
    const newExpandedRows = isRowExpanded
      ? expandedRows.filter((i) => i !== index)
      : [...expandedRows, index];
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="module-table">
      <h1 className="table-heading">Module Table</h1>
      <TableContainer component={Paper}>
        <Table aria-label="module table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10px" }} />
              <TableCell style={{ width: "10px" }} />
              <TableCell style={{ width: "50px" }}>S/N</TableCell>
              <TableCell>Module Name</TableCell>
              <TableCell>Module Protocol</TableCell>
              <TableCell style={{ width: "10px" }} />
              <TableCell style={{ width: "10px" }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {modules.map((module, index) => (
              <React.Fragment key={module.id}>
                <TableRow hover>
                  <TableCell>
                    <Checkbox
                      onChange={(event) =>
                        handleCheckboxChange(event, module.name)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleRowClick(index)}
                    >
                      {expandedRows.includes(index) ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{module.serialNo}</TableCell>
                  <TableCell>{module.name}</TableCell>
                  <TableCell>{module.protocol}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" size="small">
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" size="small">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={expandedRows.includes(index)}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={3}>
                        <TableContainer
                          component={Paper}
                          className="table-container"
                        >
                          <Table aria-label="testcase field table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Required</TableCell>
                                <TableCell>Description</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {module.testCaseFields.map((field) => (
                                <TableRow key={field.id}>
                                  <TableCell>{field.name}</TableCell>
                                  <TableCell>{field.type}</TableCell>
                                  <TableCell>
                                    {field.required ? "Yes" : "No"}
                                  </TableCell>
                                  <TableCell>{field.description}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TableContainer
                          component={Paper}
                          className="table-container"
                        >
                          <Table aria-label="module urls table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Category Name</TableCell>
                                <TableCell>URL</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {module.urls.map((url) => (
                                <TableRow key={url.id}>
                                  <TableCell>{url.categoryName}</TableCell>
                                  <TableCell>{url.url}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        {module.categories && (
                          <CategoryTable categories={module.categories} />
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
            {checkedRows.length >= 1 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <TextField
                    label="Group into..."
                    value={appName}
                    onChange={handleAppnameChange}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={handleGroupButtonClick}>
                    Group
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const modules = [
  {
    id: 1,
    serialNo: 1,
    name: "Module 1",
    protocol: "Protocol 1",
    testCaseFields: [
      {
        id: 1,
        name: "Field 1",
        type: "TextArea",
        required: true,
        description: "Description 1",
      },
      {
        id: 2,
        name: "Field 2",
        type: "Dropdown",
        required: false,
        description: "Description 2",
      },
    ],
    urls: [
      {
        id: 1,
        categoryName: "Category 1",
        url: "https://example.com",
      },
      {
        id: 2,
        categoryName: "Category 2",
        url: "https://example.com",
      },
    ],
    categories: [
      {
        name: "Device",
        configurations: ["TV", "Desktop", "Watch", "Mobile"],
        subcategories: [
          {
            subcategory: "sc1",
            name: "Mobile",
            configurations: ["config1", "config2"],
          },
          {
            subcategory: "sc2",
            name: "TV",
            configurations: ["config1", "config2"],
          },
        ],
      },
      {
        name: "Language",
        configurations: ["English", "Hindi", "French", "German"],
        subcategories: [
          {
            subcategory: "sc1",
            name: "Tamil",
            configurations: ["config1", "config2"],
          },
          {
            subcategory: "sc2",
            name: "English",
            configurations: ["config1", "config2"],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    serialNo: 2,
    name: "Module 2",
    protocol: "Protocol 2",
    testCaseFields: [
      {
        id: 3,
        name: "Field 3",
        type: "TextField",
        required: true,
        description: "Description 3",
      },
    ],
    urls: [
      {
        id: 3,
        categoryName: "Category 3",
        url: "https://example.com",
      },
    ],
  },
];

export default ModuleTable;
