import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
const generateItems = (amount:number) => {
    const arr = Array.from(Array(amount))
    return arr.map((number, i) => ({
      id: i,
      firstName: `First Name ${i + 1}`,
      lastName: `Last Name ${i + 1}`,
      email: `Email ${i + 1}`,
      password: `Password ${i + 1}`,
      description: `Description ${i + 1}`,
    }))
  }
export const TableComponent:React.FC = () => {
    const [rows, setRows] = useState(generateItems(50))
    return (
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, firstName, lastName, email, password, description }) => (
              <TableRow key={id}>
                <TableCell>{firstName}</TableCell>
                <TableCell>{lastName}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{password}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}