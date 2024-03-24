import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from "../../services/UserService";
import { ToastsContext } from '../../context/ToastsContext';
import { Button, Container, Form, Spinner, Row } from 'react-bootstrap';
import FormField from '../../components/FormField/FormField';

export default function CreateCard() {
    const toasts = useContext(ToastsContext);
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cardData, setCardData] = useState({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
        image: { url: '', alt: '' },
        address: { country: '', city: '', street: '', houseNumber: '', zip: '' },
    });

    const [validity, setValidity] = useState({
        phone: false,
        email: false,
        web: false,
    });

    const urlRegex = new RegExp('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$');
    const phoneRegex = new RegExp('0[0-9]{1,2}-?\\s?[0-9]{3}\\s?[0-9]{4}');
    const emailRegex = new RegExp('^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$');

    const handleInputChange = (e, field: string) => {
        const { value } = e.target;
        let isValid = true;

        if (field === 'phone') {
            isValid = phoneRegex.test(value);
        }
        else if (field === 'email') {
            isValid = emailRegex.test(value);
        }
        else if (field === 'web') {
            isValid = urlRegex.test(value);
        }

        setCardData(prev => ({
            ...prev,
            [field.includes('.') ? field.split('.')[0] : field]: field.includes('.') ? { ...prev[field.split('.')[0]], [field.split('.')[1]]: value } : value,
        }));

        setValidity(prev => ({ ...prev, [field]: isValid }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allFieldsValid = Object.values(validity).every(field => field === true);
        if (!allFieldsValid) {
            toasts?.addToast('Error', 'Invalid Form', 'Please ensure all fields are correctly filled.', 'danger');
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true);
        const token = await getToken();

        try {
            const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify(cardData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create card');
            }

            toasts?.addToast('Success', 'Card Created', 'Your business card has been successfully created.', 'success');
            navigate('/mycards');
        } catch (error) {
            console.error('Card creation failed:', error);
            toasts?.addToast('Error', 'Creation Failed', error.message, 'danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="BusinessPage">
            <h3 className="m-4">Create New Business Card</h3>
            <Form onSubmit={handleSubmit}>
                {/* Card Details fields */}
                <Row className="mb-4 fw-bold">
                    <FormField controlId="formTitle" label="Title" type="text" placeholder="Card title"
                        value={cardData.title} onChange={(e) => handleInputChange(e, 'title')}
                    />
                    <FormField controlId="formSubtitle" label="Subtitle" type="text" placeholder="Card subtitle"
                        value={cardData.subtitle} onChange={(e) => handleInputChange(e, 'subtitle')}
                    />
                </Row>

                <Row className="mb-4 fw-bold">
                    <FormField controlId="formDescription" label="Description" as="textarea" placeholder="Description of services"
                        value={cardData.description} onChange={(e) => handleInputChange(e, 'description')}
                    />
                </Row>

                {/* Contact details fields */}
                <Row className="mb-4 fw-bold">
                    <FormField controlId="formPhone" label="Phone" type="text" placeholder="Phone number"
                        value={cardData.phone} onChange={(e) => handleInputChange(e, 'phone')} regex={phoneRegex} validationMessage="Please enter a valid phone number." isValid={validity.phone}
                    />
                    <FormField controlId="formEmail" label="Email" type="email" placeholder="Email address"
                        value={cardData.email} onChange={(e) => handleInputChange(e, 'email')} regex={emailRegex} validationMessage="Please enter a valid email address." isValid={validity.email}
                    />
                    <FormField controlId="formWeb" label="Web" type="text" placeholder="Website URL" value={cardData.web}
                        onChange={(e) => handleInputChange(e, 'web')} regex={urlRegex} validationMessage="Please enter a valid URL." isValid={validity.web}
                    />
                </Row>

                {/* Visual Display fields */}
                <Row className="mb-4 fw-bold">
                    <FormField controlId="formImageUrl" label="Image URL" type="text" placeholder="Image URL"
                        value={cardData.image.url} onChange={(e) => handleInputChange(e, 'image.url')}
                    />
                    <FormField controlId="formImageAlt" label="Image Alt Text" type="text" placeholder="Image description"
                        value={cardData.image.alt} onChange={(e) => handleInputChange(e, 'image.alt')}
                    />
                </Row>

                {/* Address fields */}
                <Row className="mb-4 fw-bold">
                    <FormField controlId="formCountry" label="Country" type="text" placeholder="Country"
                        value={cardData.address.country} onChange={(e) => handleInputChange(e, 'address.country')}
                    />
                    <FormField controlId="formCity" label="City" type="text" placeholder="City"
                        value={cardData.address.city} onChange={(e) => handleInputChange(e, 'address.city')}
                    />
                </Row>

                <Row className="mb-4 fw-bold">
                    <FormField controlId="formStreet" label="Street" type="text" placeholder="Street"
                        value={cardData.address.street} onChange={(e) => handleInputChange(e, 'address.street')}
                    />
                    <FormField controlId="formHouseNumber" label="House Number" type="text" placeholder="House number"
                        value={cardData.address.houseNumber} onChange={(e) => handleInputChange(e, 'address.houseNumber')}
                    />
                    <FormField controlId="formZip" label="ZIP" type="text" placeholder="ZIP code"
                        value={cardData.address.zip} onChange={(e) => handleInputChange(e, 'address.zip')}
                    />
                </Row>

                <Button className='m-5' variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    ) : (
                        'Create Card'
                    )}
                </Button>
            </Form>
        </Container>

    );
};

