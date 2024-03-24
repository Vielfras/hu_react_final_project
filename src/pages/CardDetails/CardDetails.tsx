import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ICard } from '../../interfaces/CardInterfaces';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { FaPhone, FaEnvelope, FaGlobe, FaBuilding, FaHome, FaMapPin, FaMapMarkerAlt, FaCity } from 'react-icons/fa';
import { ToastsContext } from '../../context/ToastsContext';
import { doDeleteCard } from '../../services/CardsService';

import './CardDetails.css';


export default function CardDetails() {
  const { cardId } = useParams();
  const [card, setCard] = useState<ICard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const toasts = useContext(ToastsContext)

  const handleDeleteCard = async () => {
    if (!cardId || !card?.bizNumber) {
      toasts?.addToast('Error', 'Delete Failed', 'Invalid card ID or business number.', 'danger');
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to delete this card?');
    if (!isConfirmed) {
      return;
    }

    const { error, result } = await doDeleteCard(cardId, card.bizNumber);

    if (error) {
      toasts?.addToast('Error', 'Delete Failed', error, 'danger');
    } else {
      toasts?.addToast('Success', 'Card Deleted', 'Your business card has been successfully deleted.', 'success');
      navigate('/mycards');
    }
  };


  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data);
        setCard(data);
      } catch (err) {
        const errMessage = (err as Error).message;
        setError(errMessage);
      }
    };
    fetchCard();
  }, [cardId]);

  const goToEditCard = () => {
    navigate(`/edit-card/${cardId}`, { state: { card } });
  };


  return (
    <Container className='mt-5'>
      <h3>Card Details</h3>
      <br />

      {error && (
        <>
          <h5>Error getting card '{cardId}':</h5>
          <p className="text-danger">{error}</p>
        </>
      )}

      {card && (
        <Card className="mb-4">
          <Card.Header>{card.title ? `${card.title} | Liked ${card.likes.length} times` : "N/A"}</Card.Header>
          <Card.Body className="text-center">
            {card.image.url ? (
              <Card.Img variant="top" src={card.image.url} style={{ maxHeight: '500px', maxWidth: '500px', objectFit: 'cover' }} />
            ) : (
              <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>No image available</p>
              </div>
            )}
            <Card.Title className="mt-3">{card.subtitle || "N/A"}</Card.Title>
            <Card.Text>{card.description || "No description provided."}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="outline-primary" size='sm' onClick={goToEditCard}>
              <CiEdit /> Edit Card
            </Button>
            <Button variant="outline-danger" size='sm' className='ms-5' onClick={handleDeleteCard}>
              <CiTrash /> Delete Card
            </Button>
          </Card.Footer>
        </Card>
      )}

      {card && (
        <Container className='mb-4 py-4 border rounded shadow-sm'>
          <Row>
            <Col md={6}>
              <h4 className="mb-3">Contact Details <FaBuilding /></h4>
              <p><FaPhone /> Phone: {card.phone || "N/A"}</p>
              <p><FaEnvelope /> Email: {card.email || "N/A"}</p>
              <p><FaGlobe /> Website: {card.web || "N/A"}</p>
              <p><FaMapMarkerAlt /> BizNum: {card.bizNumber || "N/A"}</p>
            </Col>
            <Col md={6}>
              <h4 className="mb-3">Location Details <FaHome /></h4>
              <p><FaMapPin /> State: {card.address.state || "N/A"}</p>
              <p><FaMapMarkerAlt /> Country: {card.address.country || "N/A"}</p>
              <p><FaCity /> City: {card.address.city || "N/A"}</p>
              <p><FaMapPin /> Street: {card.address.street || "N/A"}</p>
              <p><FaHome /> House Num: {card.address.houseNumber || "N/A"}</p>
              <p><FaMapMarkerAlt /> Zip: {card.address.zip || "N/A"}</p>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}
