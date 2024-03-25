import './Free.css';

import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Button, Card, Spinner } from 'react-bootstrap';

import { ICard } from '../../interfaces/CardInterfaces';
import { doGetAllCards, doToggleCardLike } from '../../services/CardsService';
import { AuthContext } from '../../context/AuthContext';
import BusinessCard from '../../components/BusinessCard/BusinessCard';

// import { AiOutlineLike } from 'react-icons/ai';

export default function Free() {
  const [cards, setCards] = useState<ICard[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    navigate(`/card-details/${cardId}`, { state: { cardId: cardId } });
  };

  const userId:string = auth?.userDetails?._id || '';

  return (
    <div className='FreePage'>
      <h3>Free Page</h3>
      <br></br>
      <div>
        {error && <p>Error getting cards 😞 <br></br> {error}</p>}
      </div>
      {cards ? (
        <>
          <Row xs={1} md={2} lg={3} xl={4} className="g-5">
            {cards.map((card) => (
              <Col key={card._id}>
                <BusinessCard key={card._id} userId ={userId} card={card} goToCardDetails={goToCardDetails} />
              </Col>
            ))}
          </Row>
          <h5>Total {cards?.length} card</h5>
        </>
      ) : (
        !error && (
          <>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              className='me-2'
            />
            <span>Loading cards, Please wait ...</span>
          </>
        )
      )}
    </div>
  );
}
