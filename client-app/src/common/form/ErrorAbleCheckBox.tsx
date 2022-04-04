import { useField } from 'formik';
import { Form } from 'semantic-ui-react';
interface Props{
    name: string;
    label?: string;
}

export default function ErrorAbleCheckBox(props: Props) {
    const [field, meta] = useField(props.name);
    
    return (
        <Form.Checkbox
            error={meta.touched && !!meta.error ? { content: meta.error, pointing: 'left' } : null}
            {...field}
            {...props}
        />
    )
}