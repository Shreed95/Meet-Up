import React, { useState } from 'react';
import { useCenter } from '../context/Center';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const centerState = useCenter();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value === "Camp, Pune") {
      centerState.setCenter({ lng: 18.499, lat: 73.8957 });
    } else if (value === "Gandhinagar, Gujurat") {
      centerState.setCenter({ lng: 23.2156, lat: 72.6369 });
    } else if (value === "Delhi, India") {
      centerState.setCenter({ lng: 28.7041, lat: 77.1025 });
    }
  };

  const handleSearchClick = () => {
    setSuggestionsVisible(!suggestionsVisible);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestionsVisible(false);
  };

  const suggestions = ['Camp, Pune', 'Gandhinagar, Gujurat', 'Delhi, India'];

  return (
    <div className="relative flex flex-col justify-center">
      <div className='my-6 text-center text-xl'>Search Places <span className='text-md text-gray-300'>(Future Implementation)</span></div>
      <input
        type="text"
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onClick={handleSearchClick}
      />
      {suggestionsVisible && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-60 w-52">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
