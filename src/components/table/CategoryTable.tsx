import { useState } from "react";
import Paper from "@mui/material/Paper";
import { TreeDataState, CustomTreeData } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from "@devexpress/dx-react-grid-material-ui";

import TableCell from "@mui/material/TableCell";

const getChildRows = (row, rootRows) => {
  if (!row) {
    return rootRows;
  }
  return row.subcategories;
};

export default function CategoryTable(props) {
  const [columns] = useState([
    { name: "name", title: "Name" },
    { name: "configurations", title: "Configurations" },
  ]);
  const [data] = useState(props.categories);
  const [tableColumnExtensions] = useState([
    { columnName: "name", width: 300 },
  ]);

  return (
    <Paper style={{ marginTop: "20px" }}>
      <Grid rows={data} columns={columns}>
        <TreeDataState />
        <CustomTreeData getChildRows={getChildRows} />
        <Table
          columnExtensions={tableColumnExtensions}
          cellComponent={({ column, value }) => {
            if (column.name === "configurations") {
              return <TableCell>{value.join(", ")}</TableCell>;
            }
            return <TableCell>{value}</TableCell>;
          }}
        />
        <TableHeaderRow />
        <TableTreeColumn for="name" />
      </Grid>
    </Paper>
  );
}
