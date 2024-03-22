// import './Business.css'

// import { useContext } from 'react'
// import { AuthContext } from '../../context/AuthContext'
// import { useNavigate } from 'react-router-dom'
// import { BsFillSignStopFill } from 'react-icons/bs'

// export default function Business() {

//   const auth = useContext(AuthContext)
//   const navigate = useNavigate()

//   return (
//     <div className='Business Page'>
//       <h3>Business Page</h3>
//       <br></br>

// {
//         (auth?.userDetails) && (auth.userDetails.isBusiness || auth.userDetails.isAdmin) ?
//           <p>Welcome {auth.userDetails.name.first} 😊</p>
//         :
//           <Container className='px-5'>
//             <Card>
//               <Card.Header as="h6" className='py-3'><BsFillSignStopFill size={24} className='me-1' fill='darkred' style={{ marginTop: '-4px' }} /> Access Denied</Card.Header>
//               <Card.Body>
//                 <Card.Text>
//                   <p></p>
//                   <p>Only an authorized <strong>business</strong> can view the content of this page.</p>
//                 </Card.Text>
//                 <p className='pt-3'>
//                   <Button onClick={() => navigate('/signin')} className='mx-2' variant='outline-primary' size='sm'>Sign In</Button>
//                   <Button onClick={() => navigate('/signup')} className='mx-2' variant='outline-primary' size='sm'>Sign Up</Button>
//                 </p>
//               </Card.Body>
//             </Card>
//           </Container>
//       }

//     </div>
//   )
// }


import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ToastsContext } from '../../context/ToastsContext';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Card, Form, Spinner, Row } from 'react-bootstrap';
import { BsFillSignStopFill } from 'react-icons/bs'
import FormField from '../../components/FormField/FormField';

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

    const token = auth.token; // Assuming your AuthContext provides the token

    try {
      const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(formData)
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
      <Form onSubmit={handleSubmit}>
        <Container className="BusinessPage">
          <h3>Create New Business Card</h3>
          <Form onSubmit={handleSubmit}>
            {/* Card Details fields */}

            <Row className="mb-4  fw-bold">
              <FormField controlId="formTitle" label="Title" type="text" placeholder="Card title" value={cardData.title} onChange={(e) => handleInputChange('title', e.target.value)}
              />
              <FormField controlId="formSubtitle" label="Subtitle" type="text" placeholder="Card subtitle" value={cardData.subtitle} onChange={(e) => handleInputChange('subtitle', e.target.value)}
              />
            </Row>

            <Row className="mb-4  fw-bold">
              <FormField controlId="formDescription" label="Description" as="textarea" placeholder="Description of services" value={cardData.description} onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Row>

            {/*Contanct details fields */}
            <Row className="mb-4  fw-bold">
              <FormField controlId="formPhone" label="Phone" type="text" placeholder="Phone number" value={cardData.phone} onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              <FormField controlId="formEmail" label="Email" type="email" placeholder="Email address" value={cardData.email} onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <FormField controlId="formWeb" label="Web" type="text" placeholder="Website URL" value={cardData.web} onChange={(e) => handleInputChange('web', e.target.value)}
              />
            </Row>

            {/* Visual Display fields */}
            <FormField controlId="formImageUrl" label="Image URL" type="text" placeholder="Image URL" value={cardData.image.url} onChange={(e) => handleInputChange('image.url', e.target.value)}
            />
            <FormField controlId="formImageAlt" label="Image Alt Text" type="text" placeholder="Image description" value={cardData.image.alt} onChange={(e) => handleInputChange('image.alt', e.target.value)}
            />

            {/* Address fields */}
            <FormField controlId="formCountry" label="Country" type="text" placeholder="Country" value={cardData.address.country} onChange={(e) => handleInputChange('address.country', e.target.value)}
            />
            <FormField controlId="formCity" label="City" type="text" placeholder="City" value={cardData.address.city} onChange={(e) => handleInputChange('address.city', e.target.value)}
            />
            <FormField controlId="formStreet" label="Street" type="text" placeholder="Street" value={cardData.address.street} onChange={(e) => handleInputChange('address.street', e.target.value)}
            />
            <FormField controlId="formHouseNumber" label="House Number" type="text" placeholder="House number" value={cardData.address.houseNumber} onChange={(e) => handleInputChange('address.houseNumber', e.target.value)}
            />
            <FormField controlId="formZip" label="ZIP" type="text" placeholder="ZIP code" value={cardData.address.zip} onChange={(e) => handleInputChange('address.zip', e.target.value)}
            />

            {/* Submit button */}
            <Button className='m-5' variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Create Card'
              )}
            </Button>
          </Form>
        </Container>
      </Form>
    </Container >
  );
}
