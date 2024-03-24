import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from "../../services/UserService";
import { ToastsContext } from '../../context/ToastsContext';
import { Button, Container, Form, Spinner, Row } from 'react-bootstrap';
import FormField from '../../components/FormField/FormField';
import { doGetCardById, doUpdateCard } from "../../services/CardsService";

export default function EditCard() {
  const toasts = useContext(ToastsContext);
  const navigate = useNavigate();
  const { cardId } = useParams();

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

  useEffect(() => {
    const fetchCardData = async () => {
      const { error, result } = await doGetCardById(cardId);
      if (error) {
        toasts?.addToast('Error', 'Fetch Failed', error, 'danger');
        return;
      }
      setCardData({
        title: result.title,
        subtitle: result.subtitle,
        description: result.description,
        phone: result.phone,
        email: result.email,
        web: result.web,
        image: result.image,
        address: result.address,
      });
      setValidity({ phone: true, email: true, web: true });
    };

    fetchCardData();
  }, [cardId, toasts]);


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

    setCardData(prev => {
      const [parentField, childField] = field.split('.');
      return field.includes('.')
        ? { ...prev, [parentField]: { ...prev[parentField], [childField]: value } }
        : { ...prev, [field]: value };
    });
    
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

    const { error, result } = await doUpdateCard(cardId, cardData);

    if (error) {
      console.error('Card update failed:', error);
      toasts?.addToast('Error', 'Update Failed', error, 'danger');
      setIsSubmitting(false);
    } else {
      toasts?.addToast('Success', 'Card Updated', 'Your business card has been successfully updated.', 'success');
      navigate('/mycards');
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="EditCardPage">
      <h3 className="m-4">Edit Business Card</h3>
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
            value={String(cardData.address.houseNumber)} onChange={(e) => handleInputChange(e, 'address.houseNumber')}
          />
          <FormField controlId="formZip" label="ZIP" type="text" placeholder="ZIP code"
            value={String(cardData.address.zip)} onChange={(e) => handleInputChange(e, 'address.zip')}
          />
        </Row>

        <Button className='m-5' variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            'Update Card'
          )}
        </Button>
      </Form>
    </Container>
  );

};
