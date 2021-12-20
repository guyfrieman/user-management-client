import { StandardTextFieldProps, TextField } from "@material-ui/core";
import { RefObject, useState } from "react";

interface FormTextFieldProps extends StandardTextFieldProps {
    inputRef: RefObject<HTMLInputElement>;
}

export const FormTextField: React.FC<FormTextFieldProps> = ({id, required, inputRef,label, type, helperText, autoFocus}) => {
    const [isError, setIsError] = useState(false);
    const onChange = () => {
        setIsError(!inputRef?.current?.checkValidity() ?? false);
    };
    const onBlur = () => {
        setIsError(!inputRef?.current?.checkValidity() ?? false);
    };
    return (<TextField 
        required={required}
        error={isError}
        autoFocus={autoFocus}
        id={id}
        label={label}
        type={type}
        inputRef={inputRef}
        helperText={isError ? helperText : ''}
        onChange={onChange}
        onBlur={onBlur}
    />);
};