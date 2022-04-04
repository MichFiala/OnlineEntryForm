import { useField } from "formik";
import { Form } from 'semantic-ui-react';
interface Props{
    placeholder: string;
    name: string;
    type?: string;
    label?: string;
}

export default function ErrorAbleTextInput(props: Props) {
    const [field, meta] = useField(props.name);
    
    return (
        <Form.Input
            error={meta.touched && !!meta.error ? { content: meta.error, pointing: 'above' } : null}
            {...field}
            {...props}
        />
    )
}