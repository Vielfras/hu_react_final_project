import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { ICard } from '../../interfaces/CardInterfaces'

import { CiEdit, CiTrash } from 'react-icons/ci'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

import './CardDetails.css'


export default function CardDetails() {

  const { cardId } = useParams()

  const [card, setCard] = useState<ICard | null>(null)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json()
        if (!response.ok) throw new Error(data)
        setCard(data)
      } catch (err) {
        const errMessage = (err as Error).message
        setError(errMessage)
      }
    };
    fetchCard();
  }, [cardId])

  const goToEditCard = (card: ICard) => {
    navigate(`/edit-card/${cardId}`, { state: { card } })
  }

  return (
    <div className='CardDetails Page'>
      <h3>Card Details</h3>
      <br></br>

      <div>
        {
          (error) &&
          <>
            <h5>Error getting card '{cardId}' :</h5>
            <p style={{ color: 'red' }}>{error}</p>
          </>
        }
      </div>
      {
        (card) ?
          <Container>

                <Card className="text-center">
                  <Card.Header style={{ fontWeight: '500' }}>{card.title}</Card.Header>
                  <Card.Body>
                    <Card.Img variant="top" src={card.image.url} style={{ maxHeight: '500px', maxWidth: '500px', objectFit: 'cover' }} />
                    <Card.Title className="mt-4">{card.subtitle}</Card.Title>

                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <Button variant="primary" size='sm' className='mx-3'
                      onClick={() => goToEditCard(card)}>
                      <CiEdit className='me-1' size={22} style={{ marginTop: '-5px' }} />Edit Card
                    </Button>
                    <Button variant="danger" size='sm' className='mx-3'>
                      {/* TODO - Add a toast for confirmation of card deletion */}
                      <CiTrash className='me-1' size={22} style={{ marginTop: '-5px' }} />Delete Card
                    </Button>
                  </Card.Footer>
                </Card>
            
              <div className='mt-4 py-5 border rounded'>
                <p>{card.description}</p>

                <hr></hr>
                <h4>Contact Details</h4>
                <p>{card.phone}</p>
                <p>{card.email}</p>
                <p>{card.web}</p>
                <p>BizNum: {card.bizNumber}</p>
                <p>Likes: {card.likes.length}</p>
                <p>Created on: {card.createdAt}</p>
              </div>
          </Container>
          :
          null
      }

    </div>
  )
}
