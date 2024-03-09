import React, { useState, useEffect } from 'react';
import PlaceDetails from './PlaceDetails';
import Spinner from './Spinner';

const List = ({ places }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (places) {
      setLoading(false);
    }
  }, [places]);

  return (
    <div className="container pl-2 pr-2 h-screen overflow-y-scroll bg-slate-900 pb-8">
      <h4 className="text-4xl font-bold text-center text-white my-4">Suggested Places</h4>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {places?.map((place, i) => (
            <div className='flex justify-center items-center' key={i}>
              <PlaceDetails place={place} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default List;
