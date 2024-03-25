import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { AiOutlineLike } from 'react-icons/ai';
import { ICard } from '../../interfaces/CardInterfaces';
import { doToggleCardLike } from "../../services/CardsService";

import "./BusinessCard.css"

interface IBusinessCard {
  userId:string;
  card: ICard;
  goToCardDetails: (cardId: string) => void;
}

export default function BusinessCard({userId, card, goToCardDetails }: IBusinessCard) {
  const [localCard, setLocalCard] = useState<ICard | null>(card);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLikeToggle = async () => {
    setIsLoading(true);
    const { error, result } = await doToggleCardLike(card._id);
    if (error) {
      setError(error);
      setIsLoading(false);
    } else {
      setLocalCard(result);
      setIsLoading(false);
    }
  };

  return (
    <Card className="BusinessCard text-center">
      <Card.Header style={{ fontWeight: '500' }}>{localCard?.title}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={localCard?.image.url} style={{ minHeight: '200px', minWidth: '200px', maxHeight: '500px', maxWidth: '500px', objectFit: 'cover' }} />
        <Card.Title>{localCard?.subtitle}</Card.Title>
        <Card.Text>
          {localCard?.description}
        </Card.Text>
        <Button variant="primary" size='sm' onClick={() => goToCardDetails(card._id)}>Go to card</Button>
      </Card.Body>
      <Card.Footer className="text-muted cardFooter"
        onClick={handleLikeToggle} disabled={isLoading}>
          {localCard?.likes.length}
        <span className={`${localCard?.likes.includes(userId) ? 'text-primary' : ''}`}>
        <AiOutlineLike size={18} style={{ marginTop: '-5px' }}
        />   </span>
    </Card.Footer>
    </Card >
  );
}
