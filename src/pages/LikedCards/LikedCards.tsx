import './LikedCards.css'
import { AiOutlineLike } from 'react-icons/ai';

import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Col, Row, Button, Card, Spinner } from 'react-bootstrap';

import { doGetAllCards } from '../../services/CardsService';
import { AuthContext } from '../../context/AuthContext'; // Ensure this path is correct

import { ICard } from '../../interfaces/CardInterfaces';

export default function LikedCards() {
  const [cards, setCards] = useState<ICard[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCards = async () => {
      const { error, result } = await doGetAllCards();
      if (error) {
        setError(error);
      } else {
        setCards(result);
      }
    };
    getAllCards();
  }, []);

  const goToCardDetails = (cardId: string) => {
    navigate(`/card-details/${cardId}`, { state: { cardId: cardId } })
  };

  const userId = auth?.userDetails?._id || ''; 

  return (
    <div className='LikedCards'>
      <h3 className='m-5'>Like Cards</h3>
      <br></br>
      <div>
        {error && <p>Error getting cards 😞 <br></br> {error}</p>}
      </div>
      {cards ? (
        <>
          <Row xs={1} md={2} lg={3} xl={4} className="g-5">
            {cards.filter(card => card.likes.includes(userId)).map((card) => (
              <Col key={card._id}>
                <Card className="text-center mb-3">
                  <Card.Header style={{ fontWeight: '500' }}>{card.title}</Card.Header>
                  <Card.Body>
                    <Card.Img variant="top" src={card.image.url} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Title>{card.subtitle}</Card.Title>
                    <Card.Text>
                      {card.description}
                    </Card.Text>
                    <Button variant="primary" size='sm' onClick={() => goToCardDetails(card._id)}>Go to card</Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">{card.likes.length} <AiOutlineLike size={18} style={{ marginTop: '-5px' }} /></Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (!error) && (
        <>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            variant='primary'
            aria-hidden="true"
            className='me-2'
          />
          <span>Loading cards, Please wait ...</span>
        </>
      )}
    </div>
  )
}
