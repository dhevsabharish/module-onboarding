import { Table, TableBody, TableCell, TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moduleData from './moduleModel.ts';

function ModuleTable() {

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Module Name</TableCell>
          <TableCell>Module URL</TableCell>
          <TableCell>Protocol</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {moduleData.map((module) => (
          <TableRow key={module.moduleName}>
            <TableCell>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{module.moduleName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Table>
                    <TableBody>
                      {module.categories.map((category) => (
                        <TableRow key={category.name}>
                          <TableCell>{category.name}:</TableCell>
                          <TableCell>{category.values.join(', ')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            </TableCell>
            <TableCell>{module.moduleUrl}</TableCell>
            <TableCell>{module.protocol}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ModuleTable;