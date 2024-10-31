import React from 'react';
import { Form } from 'react-bootstrap';

const FormElement = ({ value, label, type = "text", onChange }: { label: string; type?: string; value: string; onChange: React.ChangeEventHandler<HTMLInputElement> | undefined; }) => {
    return (
        <div>
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            </Form.Group>
        </div>
    );
};

export default FormElement;