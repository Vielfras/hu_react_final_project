import { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { CiEdit, CiTrash } from 'react-icons/ci'
import './CardDetails.css'

interface ICard {
  _id: string
  title: string
  subTitle: string
  description: string
  image: { url: string, alt: string }
  bizNumber: number
  user_id: string
}

export default function CardDetails() {

  const { cardId } = useParams()

  const [card, setCard] = useState<ICard|null>(null)
  const [error, setError] = useState<string|null>(null)

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
  },[cardId])

  const goToEditCard = (card:ICard) => {
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
              <p style={{color:'red'}}>{error}</p>
            </>
        }
      </div>
      {
        (card) ?
        <Container>
          
          <Row className="g-5">
              <Col>
                <Card className="text-center">
                  <Card.Header style={{fontWeight:'500'}}>{card.title}</Card.Header>
                  <Card.Body>
                    <Card.Img variant="top" src={card.image.url} style={{height:'200px',objectFit:'cover'}}/>
                    <Card.Title>{card.subTitle}</Card.Title>
                    <Card.Text>
                      {card.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <Button variant="primary" size='sm' className='mx-3'
                      onClick={() => goToEditCard(card)}>
                      <CiEdit className='me-1' size={22} style={{marginTop:'-5px'}}/>Edit Card
                    </Button>
                    <Button variant="danger" size='sm' className='mx-3'>
                      {/* TODO - Add a toast for confirmation of card deletion */}
                      <CiTrash className='me-1' size={22} style={{marginTop:'-5px'}}/>Delete Card
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
              <Col className='border rounded'>
                <div className='py-5'>
                  Maybe the 'Add new card' \ 'Edit card' option here ? ...
                  <br></br>
                  Maybe just additional info (likes count, owner, creation date, etc ...) ?
                </div>
              </Col>

          </Row>
        </Container>
          :
          null
      }

    </div>
  )
}
