import React, { useState, useEffect } from 'react';
import { getPlacesName } from '../api/index';
import { useSearch } from '../context/SearchPlace';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const searchState = useSearch();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() !== '') {
        try {
          const suggestions = await getPlacesName(searchTerm);
          setSuggestions(suggestions);
          setSuggestionsVisible(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setSuggestionsVisible(false);
      }
    };

    fetchSuggestions();

    return () => {
      setSuggestions([]);
      setSuggestionsVisible(false);
    };
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.place_name);
    searchState.setSearchPlace(suggestion.geometry.coordinates);
    setSuggestionsVisible(false);
  };

  return (
    <div className="relative flex flex-col justify-center w-72">
      <div className='block text-sm font-medium text-black mb-1'>Search Places</div>
      <input
        type="text"
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {suggestionsVisible && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md top-16 w-72">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="px-4 py-2 cursor-pointer text-black hover:bg-gray-100"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <p className='text-md font-bold'>{suggestion.text_en}</p>
            <p className='text-sm text-gray-500'>{suggestion.place_name_en}</p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default SearchBar;
