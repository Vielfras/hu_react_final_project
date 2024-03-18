import './Free.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Col, Row, Button, Card, Spinner } from 'react-bootstrap';

import { ICard } from '../../interfaces/CardInterfaces';
import { doGetAllCards } from '../../services/CardsService';
import { AiOutlineLike } from 'react-icons/ai';

export default function Free() {

  const [cards, setCards] = useState<ICard[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const getAllCards = async () => {
      const { error, result } = await doGetAllCards()
      if (error) {
        setError(error)
      } else {
        setCards(result)
      }
    }
    getAllCards();
  }, [])

  const goToCardDetails = (cardId: string) => {
    navigate(`/card-details/${cardId}`, { state: { cardId: cardId } })
  }

  return (
    <div className='Free Page'>
      <h3>Free Page</h3>
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
                  <Card className="text-center">
                    <Card.Header style={{ fontWeight: '500' }}>{card.title}</Card.Header>
                    <Card.Body>
                      <Card.Img variant="top" src={card.image.url} style={{ height: '200px', objectFit: 'cover' }} />
                      <Card.Title>{card.subtitle}</Card.Title>
                      <Card.Text>
                        {card.description}
                      </Card.Text>
                      <Button variant="primary" size='sm' onClick={() => goToCardDetails(card._id)}>Go to card</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">{card.likes.length} <AiOutlineLike size={18} style={{marginTop:'-5px'}}/></Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
            <h5>Total {cards?.length} card</h5>
          </>
        :
          (!error) &&
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
      }
    </div>
  )
}