import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doGetAllCards } from '../../services/CardsService'; 
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Dropdown } from 'react-bootstrap';
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

  return (
    <div className="SearchBar col-lg-5 mx-auto w-50">
      <div className="input-group">
        <input
          className="form-control border-end-0 border rounded-3"
          type="search"
          id="header-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          autoComplete="off"
        />
        <span className="input-group-append">
          <button className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-3" type="button">
            <FaMagnifyingGlass />
          </button>
        </span>
        {showSuggestions && suggestions.length > 0 && (
          <Dropdown.Menu show style={{ cursor: 'pointer', position: 'absolute', left: 0, width: '100%' }}>
            {suggestions.map((suggestion) => (
              <Dropdown.Item key={suggestion._id} onClick={() => handleSelectSuggestion(suggestion._id)}>
                {suggestion.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </div>
    </div>
  );
}
