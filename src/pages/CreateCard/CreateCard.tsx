// CreateCard.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ToastsContext } from '../../context/ToastsContext';
import { Button, Container, Form, Spinner, Row } from 'react-bootstrap';
import FormField from '../../components/FormField/FormField';

export default function CreateCard() {
    const auth = useContext(AuthContext);
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
        address: { state: '', country: '', city: '', street: '', houseNumber: '', zip: '' },
      });
    

    const handleInputChange = (field:string, value:string) => {
        if (field.includes('.')) {
            const [key, subKey] = field.split('.');
            setCardData((prev) => ({
                ...prev,
                [key]: { ...prev[key], [subKey]: value },
            }));
        } else {
            setCardData((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const token = auth?.token; // TODO - Should I get this from local storage?

        try {
            const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(cardData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create card');
            }

            const data = await response.json();
            toasts?.addToast('Success', 'Card Created', `Your business card has been successfully created.`, 'success');
            navigate('/business-cards'); // Navigate to where you list the cards or show the newly created card
        } catch (error) {
            console.error('Card creation failed:', error);
            toasts?.addToast('Error', 'Creation Failed', error.message, 'danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="BusinessPage">
            <h3 className="m-4" >Create New Business Card</h3>
            <Form onSubmit={handleSubmit}>
                {/* Card Details fields */}
                <Row className="mb-4 fw-bold">
                    <FormField controlId="formTitle" label="Title" type="text" placeholder="Card title" value={cardData.title} onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                    <FormField controlId="formSubtitle" label="Subtitle" type="text" placeholder="Card subtitle" value={cardData.subtitle} onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    />
                </Row>

                <Row className="mb-4 fw-bold">
                    <FormField controlId="formDescription" label="Description" as="textarea" placeholder="Description of services" value={cardData.description} onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                </Row>


                {/*Contanct details fields */}
                <Row className="mb-4 fw-bold">
                    <FormField controlId="formPhone" label="Phone" type="text" placeholder="Phone number" value={cardData.phone} onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    <FormField controlId="formEmail" label="Email" type="email" placeholder="Email address" value={cardData.email} onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    <FormField controlId="formWeb" label="Web" type="text" placeholder="Website URL" value={cardData.web} onChange={(e) => handleInputChange('web', e.target.value)}
                    />
                </Row>


                {/* Visual Display fields */}
                <Row className="mb-4 fw-bold">
                    <FormField controlId="formImageUrl" label="Image URL" type="text" placeholder="Image URL" value={cardData.image.url} onChange={(e) => handleInputChange('image.url', e.target.value)}
                    />
                </Row>

                <Row className="mb-4 fw-bold">
                    <FormField controlId="formImageAlt" label="Image Alt Text" type="text" placeholder="Image description" value={cardData.image.alt} onChange={(e) => handleInputChange('image.alt', e.target.value)}
                    />
                </Row>


                {/* Address fields */}
                <Row className="mb-4 fw-bold">
                    <FormField controlId="formCountry" label="Country" type="text" placeholder="Country" value={cardData.address.country} onChange={(e) => handleInputChange('address.country', e.target.value)}
                    />
                    <FormField controlId="formCity" label="City" type="text" placeholder="City" value={cardData.address.city} onChange={(e) => handleInputChange('address.city', e.target.value)}
                    />
                </Row>

                <Row className="mb-4 fw-bold">
                    <FormField controlId="formStreet" label="Street" type="text" placeholder="Street" value={cardData.address.street} onChange={(e) => handleInputChange('address.street', e.target.value)}
                    />
                    <FormField controlId="formHouseNumber" label="House Number" type="text" placeholder="House number" value={cardData.address.houseNumber} onChange={(e) => handleInputChange('address.houseNumber', e.target.value)}
                    />
                    <FormField controlId="formZip" label="ZIP" type="text" placeholder="ZIP code" value={cardData.address.zip} onChange={(e) => handleInputChange('address.zip', e.target.value)}
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

