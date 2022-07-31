import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IIngredient } from 'src/types/IIngredient';

interface FoodInfoTableProps {
  ingredients:IIngredient[];
}
const FoodInfoTable = ({ ingredients }:FoodInfoTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Food</TableCell>
            <TableCell align="center">Food Category</TableCell>
            <TableCell align="center">Measure</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Weight&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.map((row) => (
            <TableRow key={row.weight}>
              <TableCell align="center">
                {row.food}
              </TableCell>
              <TableCell align="center">{row.foodCategory}</TableCell>
              <TableCell align="center">{row.measure}</TableCell>
              <TableCell align="center">{Math.floor(row.quantity * 100) / 100}</TableCell>
              <TableCell align="center">{Math.floor(row.weight * 100) / 100}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default FoodInfoTable;
