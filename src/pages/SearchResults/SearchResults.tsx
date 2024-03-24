import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { doGetAllCards } from '../../services/CardsService';
import { AiOutlineLike } from 'react-icons/ai';

export default function SearchResults() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.state?.query || '';

  useEffect(() => {
    const fetchMatchingCards = async () => {
      setLoading(true);
      try {
        const { error, result } = await doGetAllCards();
        if (error) {
          setError(error);
          setCards([]);
        } else {
          const filteredCards = result.filter(card => card.title.toLowerCase().includes(query.toLowerCase()));
          setCards(filteredCards);
        }
      } catch (error) {
        setError('Failed to load cards.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchingCards();
  }, [query]);

  const goToCardDetails = (cardId) => {
    navigate(`/card-details/${cardId}`);
  };

  return (
    <div className='SearchResults'>
      <h3>Search Results for "{query}"</h3>
      <br />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : cards.length > 0 ? (
        <Row xs={1} md={2} lg={3} xl={4} className="g-5">
          {cards.map((card) => (
              <Col key={card._id}>
              <Card className="text-center">
                <Card.Header style={{ fontWeight: '500' }}>{card.title}</Card.Header>
                <Card.Body>
                  <Card.Img variant="top" src={card.image.url} style={{ minHeight:'200px', minWidth:'200px', maxHeight:'500px', maxWidth:'500px', objectFit: 'cover' }} />
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
      ) : (
        <p>No cards found matching "{query}".</p>
      )}
    </div>
  );
}
