import React from 'react';
import { useType } from '../context/Type';
import { useRating } from '../context/Rating';
import UpdateLocation from './UpdateLocation';
function Filters() {
    const typeState = useType();
    const ratingState = useRating();

    return (
        <div className='flex flex-col items-center'>
            <UpdateLocation />
            <div className='mt-16 text-3xl font-bold text-white'>Filters</div>
            <div className="my-16 w-72">
                <label htmlFor="type" className="block text-sm font-medium text-white mb-1">Type</label>
                <select
                    id="type"
                    value={typeState.type}
                    onChange={(e) => typeState.setType(e.target.value)}
                    className="py-2 px-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="restaurants">Restaurants</option>
                    <option value="hotels">Hotels</option>
                    <option value="attractions">Attractions</option>
                </select>
            </div>

            <div className="w-72">
                <label htmlFor="rating" className="block text-sm font-medium text-white mb-1">Rating</label>
                <select
                    id="rating"
                    value={ratingState.rating}
                    onChange={(e) => ratingState.setRating(e.target.value)}
                    className="py-2 px-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="">All</option>
                    <option value="3">Above 3.0</option>
                    <option value="4">Above 4.0</option>
                    <option value="4.5">Above 4.5</option>
                </select>
            </div>
        </div>
    )
}

export default Filters