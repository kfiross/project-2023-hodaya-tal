import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Typography} from "@mui/material";

// import {transpose} from '@/utils/utils';


const BasicTable = ({choices, user, dateStr, shomrim}) => {
  return (
    <Box width={380}>
      <Typography component="subtitle1" sx={{fontWeight: 'bold'}} >
        {dateStr}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}} align="center">{shomrim[0].firstName} {shomrim[0].lastName}</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="center">{shomrim[1].firstName} {shomrim[1].lastName}</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="center">{shomrim[2].firstName} {shomrim[2].lastName}</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="center">{shomrim[3].firstName} {shomrim[3].lastName}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={`row1-${user}`}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >

              <TableCell align="center">{choices[0]['1'] || '?' }</TableCell>
              <TableCell align="center">{choices[1]['1'] || '?' }</TableCell>
              <TableCell align="center">{choices[2]['1'] || '?' }</TableCell>
              <TableCell align="center">{choices[3]['1'] || '?' }</TableCell>
            </TableRow>

            <TableRow
              key={`row2-${user}`}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >

              <TableCell align="center">{choices[0]['2'] || '?' }</TableCell>
              <TableCell align="center">{choices[1]['2'] || '?' }</TableCell>
              <TableCell align="center">{choices[2]['2'] || '?' }</TableCell>
              <TableCell align="center">{choices[3]['2'] || '?' }</TableCell>
            </TableRow>

            <TableRow
              key={`row3-${user}`}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >

              <TableCell align="center">{choices[0]['3'] || '?' }</TableCell>
              <TableCell align="center">{choices[1]['3'] || '?' }</TableCell>
              <TableCell align="center">{choices[2]['3'] || '?' }</TableCell>
              <TableCell align="center">{choices[3]['3'] || '?' }</TableCell>
            </TableRow>

            <TableRow
              key={`row4-${user}`}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >

              <TableCell align="center">{choices[0]['4'] || '?' }</TableCell>
              <TableCell align="center">{choices[1]['4'] || '?' }</TableCell>
              <TableCell align="center">{choices[2]['4'] || '?' }</TableCell>
              <TableCell align="center">{choices[3]['4'] || '?' }</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default BasicTable;
