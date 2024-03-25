import './MyOwnCards.css'

import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';

import { AuthContext } from '../../context/AuthContext';
import { ICard } from '../../interfaces/CardInterfaces';
import { doGetMyCards } from '../../services/CardsService';
import BusinessCard from '../../components/BusinessCard/BusinessCard';

export default function MyOwnCards() {
  const [cards, setCards] = useState<ICard[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const userId:string = auth?.userDetails?._id || '';

  useEffect(() => {
    const getMyCards = async () => {
      const { error, result } = await doGetMyCards()
      if (error) {
        setError(error)
      } else {
        setCards(result)
      }
    }
    getMyCards();

    console.log("My Cards:", cards);
  }, []);

  const goToCardDetails = (cardId: string) => {
    navigate(`/card-details/${cardId}`, { state: { cardId: cardId } })
  };

  return (
    <div className='MyOwnCardsPage'>
      <h3>My Cards</h3>
      <br></br>

      <div>
        {(error) && <p>Error getting cards 😞 <br></br> {error}</p>}
      </div>
      {
        (cards) ?
          <>
            <Row xs={1} md={2} lg={3} xl={4} className="g-5">
              {cards.map((card) => (
                <Col key={card._id}>
                  <BusinessCard key={card._id} userId ={userId}  card={card} goToCardDetails={goToCardDetails} />
                </Col>
              ))}
            </Row>
            <h5>Total {cards?.length} card</h5>
          </>
        :
          (!error) &&
          <>
            <Spinner
              as="span" animation="grow" size="sm" role="status" variant='primary' aria-hidden="true" className='me-2'
            />
            <span>Loading cards, Please wait ...</span>
          </>
      }

    </div>
  )
}
