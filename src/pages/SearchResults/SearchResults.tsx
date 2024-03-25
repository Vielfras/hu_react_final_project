import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { doGetAllCards } from '../../services/CardsService';
import BusinessCard from '../../components/BusinessCard/BusinessCard';
import { ICard } from '../../interfaces/CardInterfaces';

export default function SearchResults() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.state?.query || '';

  const auth = useContext(AuthContext);

  const userId:string = auth?.userDetails?._id || '';


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
          {cards.map((card:ICard) => (
              <Col key={card._id}>
                <BusinessCard key={card._id} userId ={userId}  card={card} goToCardDetails={goToCardDetails} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No cards found matching "{query}".</p>
      )}
    </div>
  );
}
