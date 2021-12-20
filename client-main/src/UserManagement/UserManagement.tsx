import { AppBar, Button, Toolbar } from '@material-ui/core';
import React, { useState } from 'react';
import { TableComponent } from './TableComponent';
import { CreateUserDialog } from './CreateUserDialog';
import axios from 'axios';
import { useQuery } from 'react-query';

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    description?: string;
}
async function fetchUsers(){
    const {data} = await axios.get<User[]>('http://localhost:4000/');    
    return data
}

export const UserManagement: React.FC = () => {
    const [openDialog, setOpenDialog] = useState(false);
    
        
    const {isError, isLoading, data} = useQuery('users', fetchUsers);
    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <Button style={{textTransform: 'none'}} color="inherit" onClick={() => setOpenDialog(true)}>Create User</Button>
                    <CreateUserDialog open={openDialog} onClose={() => setOpenDialog(false)} users={data}></CreateUserDialog>
                </Toolbar>
            </AppBar>
            <TableComponent isLoading={isLoading} isError={isError} users={data}/>
        </>
    );
}