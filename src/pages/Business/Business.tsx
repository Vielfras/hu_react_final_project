import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ToastsContext } from '../../context/ToastsContext';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Card, Form, Spinner, Row } from 'react-bootstrap';
import { BsFillSignStopFill } from 'react-icons/bs'
import FormField from '../../components/FormField/FormField';

import "./Business.css"

export default function Business() {
  const auth = useContext(AuthContext);
  const toasts = useContext(ToastsContext);
  const navigate = useNavigate();

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
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

  // Form rendering omitted for brevity, should include inputs for all fields in formData
  return (
    <Container className='BusinessPage'>
      <div>

        <h3>Business Page</h3>
        <br></br>

        {
          (auth?.userDetails) && (auth.userDetails.isBusiness || auth.userDetails.isAdmin) ?
            <p>Welcome {auth.userDetails.name.first} 😊</p>
            :
            <Container className='px-5'>
              <Card>
                <Card.Header as="h6" className='py-3'><BsFillSignStopFill size={24} className='me-1' fill='darkred' style={{ marginTop: '-4px' }} /> Access Denied</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <p></p>
                    <p>Only an authorized <strong>business</strong> can view the content of this page.</p>
                  </Card.Text>
                  <p className='pt-3'>
                    <Button onClick={() => navigate('/signin')} className='mx-2' variant='outline-primary' size='sm'>Sign In</Button>
                    <Button onClick={() => navigate('/signup')} className='mx-2' variant='outline-primary' size='sm'>Sign Up</Button>
                  </p>
                </Card.Body>
              </Card>
            </Container>
        }
      </div>

      <Button className='m-5' onClick={() => navigate('/create-card')} variant='primary'>
        Create Card
      </Button>
    </Container >
  );
}
