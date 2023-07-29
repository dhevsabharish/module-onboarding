import React from "react";
import { useState, useEffect } from "react";
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
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function ModuleTable() {
  const [modules, setModules] = useState<any>([]);

  function getData() {
    axios
      .get(`${apiUrl}/api/modules`)
      .then((res) => {
        setModules(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getData();
  }, []);

  const [expandedRows, setExpandedRows] = useState<any>([]);
  const [checkedRows, setCheckedRows] = useState<any>([]);
  const [appName, setAppName] = useState<string>("");

  const handleAppnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(event.target.value);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _id: any
  ) => {
    if (event.target.checked) {
      setCheckedRows([...checkedRows, _id]);
    } else {
      setCheckedRows(checkedRows.filter((row) => row !== _id));
    }
  };

  const handleGroupButtonClick = () => {
    const url = `${apiUrl}/api/modules`;
    const data = {
      appName: appName,
      moduleIds: checkedRows,
    };

    axios
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        getData();
        setCheckedRows([]);
        setAppName("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRowClick = (index) => {
    const isRowExpanded = expandedRows.includes(index);
    const newExpandedRows = isRowExpanded
      ? expandedRows.filter((i) => i !== index)
      : [...expandedRows, index];
    setExpandedRows(newExpandedRows);
  };

  const handleDelete = (id: any) => () => {
    console.log(id);
    axios
      .delete(`${apiUrl}/api/modules/${id}`)
      .then((res) => {
        console.log(res.data);
        getData();
      })
      .catch((err) => console.log(err));
    getData();
  };

  const navigate = useNavigate();
  const handleEdit = (module: any) => () => {
    console.log(module);
    navigate("/form", { state: { moduleToUpdate: module } });
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
              <TableCell>Application Name</TableCell>
              <TableCell style={{ width: "10px" }} />
              <TableCell style={{ width: "10px" }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {modules.map((module, index) => (
              <React.Fragment key={index}>
                <TableRow hover>
                  <TableCell>
                    <Checkbox
                      checked={checkedRows.includes(module._id)}
                      onChange={(event) =>
                        handleCheckboxChange(event, module._id)
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{module.moduleName}</TableCell>
                  <TableCell>{module.protocol}</TableCell>
                  <TableCell>{module.Application}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={handleDelete(module._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={handleEdit(module)}
                    >
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
                              {module.testCaseFields.map((field, index) => (
                                <TableRow key={index}>
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
                          className="table-container"
                          component={Paper}
                        >
                          <Table aria-label="category table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Category Name</TableCell>
                                <TableCell>Values</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {module.categories.map((category, index) => (
                                <TableRow key={index}>
                                  <TableCell>{category.name}</TableCell>
                                  <TableCell>
                                    {category.values.join(", ")}
                                  </TableCell>
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
                                <TableCell>Category Names</TableCell>
                                <TableCell>URL</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {module.moduleURLs.map((url, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {url.categoryNames.join(", ")}
                                  </TableCell>
                                  <TableCell>{url.url}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
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

export default ModuleTable;
