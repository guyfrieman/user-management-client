import { AppBar, Button, Card, CardContent, Toolbar } from '@material-ui/core';
import React from 'react';
import { TableComponent } from './TableComponent';

export const UserManagement: React.FC = () => {
    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <Button style={{textTransform: 'none'}} color="inherit">Create User</Button>
                </Toolbar>
            </AppBar>
            <Card>
                <CardContent>
                    <TableComponent/>
                </CardContent>
            </Card>
        </>
    );
}