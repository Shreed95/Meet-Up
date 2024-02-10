import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setSuggestionsVisible(!suggestionsVisible);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestionsVisible(false);
  };

  const suggestions = ['Apple', 'Banana', 'Orange'];

  return (
    <div className="relative flex flex-col justify-center">
      <div className='my-6 text-center text-xl'>Search Places</div>
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
