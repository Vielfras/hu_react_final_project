import "./FormField.css"

import React, { useEffect, useState } from 'react';
import { Form, Col } from 'react-bootstrap';

interface IFormField {
  controlId: string;
  label: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  regex?: RegExp;
  validationMessage?: string; 
  isValid?: boolean; 
}

export default function FormField(formData: IFormField) {

  const [isValid, setIsValid] = useState(true);
  
  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData.onChange(e);
    if (formData.regex) {
      setIsValid(formData.regex.test(e.target.value));
    }
  };

  useEffect(() => {
    setIsValid(true);
  }, []);

  return (
    <Form.Group as={Col} controlId={formData.controlId}>
    <Form.Label>{formData.label}</Form.Label>
    <Form.Control
      type={formData.type}
      placeholder={formData.placeholder}
      value={formData.value}
      onChange={handleValidation}
      isInvalid={!isValid}
    />
    {!isValid && <Form.Control.Feedback type="invalid">{formData.validationMessage}</Form.Control.Feedback>}
  </Form.Group>
  );
}

