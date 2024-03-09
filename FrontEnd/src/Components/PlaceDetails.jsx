import React from 'react';
import { FaLocationDot } from "react-icons/fa6";

const PlaceDetails = ({ place }) => {
  return (
    <div className="max-w-sm md:max-w-md rounded shadow-lg bg-slate-200">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{place.properties
          .name}</div>
        <div className='flex flex-row items-center justify-center'>
          <FaLocationDot className='text-black text-xl mr-2' />
          <p className="text-gray-700 text-base">{place.properties
            .address_line2}</p>
        </div>
      </div>
      <div className="px-6 py-4">
        {place.properties.categories.map((category, index) => (
          <span key={index} className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-black m-2">
            {category.split('.').join(' ')}
          </span>
        ))}
      </div>
    </div>

  );
}

export default PlaceDetails