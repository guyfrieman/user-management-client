import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { User } from './UserManagement';
interface UsersTableProps {
  isLoading: boolean;
  isError: boolean;
  users?: User[];
}

export const TableComponent:React.FC<UsersTableProps> = ({isLoading, isError, users}) => {
    
    if(isLoading){
        <div>Loading...</div>;
    } else if(isError){
        return <div>Error</div>;
    } else if(!users || users.length === 0){
      return <div>No users</div>;
    }
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
            {users?.map(({ _id, firstName, lastName, email, password, description }) => (
              <TableRow key={_id}>
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