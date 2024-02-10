import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import temp from '../Images/temp.png';

const PlaceDetails = ({ place }) => {
  return (
    <div className="max-w-md mx-auto bg-white  shadow-md overflow-hidden">
      <img
        className="h-48 w-full object-cover"
        src={place.photo ? place.photo.images.large.url : temp}
        alt={place.name}
      />
      <div className="p-4">
        <h5 className="text-xl font-semibold mb-2">{place.name}</h5>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="ml-2">{place.num_reviews} review{place.num_reviews > 1 && 's'}</p>
          </div>
        </div>
        <div className="flex flex-row justify-between mb-2">
          <p className="font-semibold">Rating</p>
          <span>{place.rating}</span>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-semibold">Price</p>
          <p className="text-sm">{place.price_level}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-semibold">Ranking</p>
          <p className="text-sm">{place.ranking}</p>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {place?.cuisine?.map(({ name }) => (
            <span key={name} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
              {name}
            </span>
          ))}
        </div>
        {place.address && (
          <p className="text-xs text-gray-600 mt-2 flex flex-row items-center">
            <span className="mr-1">
              <FaLocationDot />
            </span>
            {place.address}
          </p>
        )}
        {place.phone && (
          <p className="text-xs text-gray-600 mt-1 flex flex-row items-center">
            <span className="mr-1">
              <FaPhone />
            </span>
            {place.phone}
          </p>
        )}
      </div>
      <div className="p-4 flex justify-between">
        <button className="text-sm text-blue-500" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </button>
        <button className="text-sm text-blue-500" onClick={() => window.open(place.website, '_blank')}>
          Website
        </button>
      </div>
    </div>

  );
}

export default PlaceDetails