import React from 'react';
import PlaceDetails from './PlaceDetails';
import Spinner from './Spinner';
import SearchPlace from './SearchPlace';

const List = ({ places }) => {
  return (
    <div className="container mx-auto pl-2 pr-2 h-screen overflow-y-auto">
<<<<<<< HEAD
      <SearchPlace />
=======
      
>>>>>>> 3ce8cecf4a91d8b77779287b5120c9d177a3eb0d
      <h4 className="text-4xl font-bold text-center my-4">Suggested Places</h4>
      {places ? (
        <div className="grid grid-cols-1 gap-4">
          {places?.map((place, i) => (
            <div key={i}>
              <PlaceDetails place={place} />
            </div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default List;
