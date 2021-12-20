import React, { useRef, useState } from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar} from '@material-ui/core'
import {FormTextField} from './FormTextField';
import { User } from './UserManagement';
import axios from 'axios';
import { useMutation } from 'react-query';

interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    description?: string;
}
interface CreateUserDialogProps{
    open: boolean;
    onClose: () => void;
    users?: User[];
}
async function createUser(user: CreateUserRequest) {
    const response = await axios.post('http://localhost:4000/createUser', user);
    return response.data;
} 
export const CreateUserDialog:React.FC<CreateUserDialogProps> = ({open, onClose, users}) => {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
    const onCloseDialog = (event: React.SyntheticEvent, reason?: string) => {
        if(reason === 'backdropClick'){
            return;
        }
        setEmailAlreadyExist(false);
        onClose();
    };
    const onCloseSnack = (event: React.SyntheticEvent, reason?: string) => {
        setEmailAlreadyExist(false);
    };
    const {isError, mutate} = useMutation<User, any, CreateUserRequest>(createUser);
    
    const onSubmitDialod = () => {
        const isValid = firstNameRef?.current?.checkValidity() && lastNameRef?.current?.checkValidity() && emailRef?.current?.checkValidity() && passwordRef?.current?.checkValidity();
        if(!isValid){
            return;
        }
        const user:CreateUserRequest = {
            firstName: firstNameRef?.current?.value ?? '',
            lastName: lastNameRef?.current?.value ?? '',
            email: emailRef?.current?.value ?? '',
            password: passwordRef?.current?.value ?? '',
            description: descriptionRef?.current?.value
        };

        if(users?.some(u => u.email.toLowerCase() === user.email.toLowerCase())){
            setEmailAlreadyExist(true);
            return;
        }
        if(isError){
            return;
        }
        
        mutate(user);
    
        onClose();
    };
    return (<Dialog open={open} onClose={onCloseDialog}>
        <DialogTitle>Create new user</DialogTitle>
        <Snackbar 
         anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
         open={emailAlreadyExist}
         autoHideDuration={6000}
         onClick={onCloseSnack}
         message='Email already exist.' />
        <DialogContent>
            <DialogContentText>
                Please fill the following fields for adding new user.
            </DialogContentText>
            <FormTextField
                required
                autoFocus
                id='firstName'
                label='firstName'
                type='text'
                inputRef={firstNameRef}
                helperText={'Please enter name'}
            />
            <FormTextField 
                required
                id='lastName'
                label='lastsName'
                type='text'
                inputRef={lastNameRef}
                helperText={'Please enter last name'}
            />
            <FormTextField 
                required
                id='email'
                label='email'
                type='email'
                inputRef={emailRef}
                helperText={'Please enter valid email'}
            />
            <FormTextField 
                required
                id='password'
                label='password'
                type='password'
                inputRef={passwordRef}
                helperText={'Please enter password'}
            />
            <FormTextField 
                id='description'
                label='description'
                type='text'
                inputRef={descriptionRef}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onCloseDialog}>Cancel</Button>
            <Button onClick={onSubmitDialod}>Submit</Button>
        </DialogActions>
    </Dialog>)
}