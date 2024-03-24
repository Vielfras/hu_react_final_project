import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ToastsContext } from '../../context/ToastsContext';
import { doUpdateCard } from "../../services/CardService";
import { getToken } from "../../services/UserService";
import FormField from '../../components/FormField/FormField';
import { ICard } from "../../interfaces/CardInterfaces";


export default function EditCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const toasts = useContext(ToastsContext);
  const initialCardState = location.state as { card: ICard };
  const [card, setCard] = useState<ICard>(initialCardState.card);
  const [isBusy, setIsBusy] = useState<boolean>(false);


  // TODO - For some reason the fields aren't being updated properly.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "image") {
      setCard((prevCard) => ({ ...prevCard, image: { ...prevCard.image, url: value } }));
    } else {
      setCard((prevCard) => ({ ...prevCard, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authToken = await getToken();

    const updateUrl = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`;

    try {
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': authToken,
        },
        body: JSON.stringify({
          title: card.title,
          subtitle: card.subTitle,
          description: card.description,
          image: card.image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update the card');
      }

      toasts?.addToast('Success', 'Card updated', 'Your card has been successfully updated.', 'success');
      navigate(`/card-details/${card._id}`, { replace: true });
    }
    catch (err) {
      console.error('Error updating card:', err);
      toasts?.addToast('Error', 'Update failed', 'There was a problem updating your card. Please try again.', 'danger');
    }
  };

  return (
    <Container className='EditCard Page'>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <h3 className="display-6 fw-bold">Edit Card</h3>
            <FormField
              controlId="formCardTitle" label="Title" type="text"
              placeholder="Enter title" name="title" value={card.title} onChange={handleInputChange}
            />
            <FormField
              controlId="formCardSubtitle" label="Subtitle" type="text" placeholder="Enter subtitle"
              name="subTitle" value={card.subTitle} onChange={handleInputChange}
            />
            <FormField
              controlId="formCardDescription" label="Description" as="textarea" rows={3}
              placeholder="Enter description" name="description" value={card.description} onChange={handleInputChange}
            />
            <FormField
              controlId="formCardImageUrl" label="Image URL" type="text" placeholder="Enter image URL"
              name="image" value={card.image.url} onChange={handleInputChange}
            />
            <div className="text-center mt-4">
              <Button variant="primary" type="submit" disabled={isBusy}>
                {isBusy ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Update Card'}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
