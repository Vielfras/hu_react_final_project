import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doGetAllCards } from '../../services/CardsService';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Dropdown, Form, InputGroup, Button } from 'react-bootstrap';
import "./SearchBar.css";

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        const { error, result } = await doGetAllCards();
        if (!error) {
          const filteredSuggestions = result?.filter(card =>
            card.title.toLowerCase().includes(query.toLowerCase())
          );
          
          setSuggestions(filteredSuggestions);
          setShowSuggestions(true);
        }
      } else {
        setShowSuggestions(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 100); 

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelectSuggestion = (cardId) => {
    navigate(`/card-details/${cardId}`);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);

    if (suggestions.length === 1) {
      navigate(`/card-details/${suggestions[0]._id}`);
    } 
    else {
      navigate('/search', { state: { query } });
    }

    setQuery('');
  };

  return (
    <div className="SearchBar col-lg-5 mx-auto w-50">
      <Form onSubmit={handleSubmit} className="input-group">
        <InputGroup>
          <Form.Control
            type="search"
            id="header-search-input"
            className="form-control border-end-0 border rounded-3"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            autoComplete="off"
          />
          <Button variant="outline-secondary" className="bg-white border-start-0 rounded-3" type="submit">
            <FaMagnifyingGlass />
          </Button>
        </InputGroup>
        {showSuggestions && suggestions.length > 0 && (
          <Dropdown.Menu show style={{ cursor: 'pointer', position: 'absolute', left: 0, width: '100%' }}>
            {suggestions.map((suggestion) => (
              <Dropdown.Item key={suggestion._id} onClick={() => handleSelectSuggestion(suggestion._id)}>
                {suggestion.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </Form>
    </div>
  );
}
