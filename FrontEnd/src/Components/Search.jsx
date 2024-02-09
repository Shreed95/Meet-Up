import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const SearchBar = ({ setonSelect }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const { user } = useAuthContext();

    const fetchName = async (value) => {
        try {
            const response = await fetch("http://localhost:5000/api/search", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.authToken}`
                },
                body: JSON.stringify({
                    name: value
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const jsonResponse = await response.json();
            const json = jsonResponse.suggestions || [];
            setFilteredSuggestions(json);
        } catch (error) {
            console.log('Error fetching name:', error.message);
        }
    };
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (user) {
            fetchName(value);
        }
    };

    const handleSelect = (selectedValue) => {
        setInputValue(selectedValue);
        setonSelect(selectedValue);
        setFilteredSuggestions([]);
    };

    return (
        <div className="relative mt-5">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search your Friends..."
                className="py-2 px-4 rounded-md w-80 border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 w-80 mt-1 bg-gray-300 rounded-md shadow-md">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(suggestion.name)}
                            className="py-2 px-4 cursor-pointer hover:bg-gray-100 text-black"
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
