import React, { useState,useEffect } from 'react'
import NavBar from '../Components/NavBar';
import PlacesList from '../Components/PlacesList';
import Map1 from '../Components/Map1';
import { useCenter } from '../context/Center';

const Service = () => {
  const [places, setPlaces] = useState(null);
  const [coordinates,setCoordinates] = useState({ lng:73.9123321, lat:18.5667409 });
  const centerState = useCenter();

  useEffect(() => {
    setCoordinates({lng:centerState.center.lng,lat:centerState.center.lat});
  }, [centerState.center]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row justify-start">
        <div className="md:w-[65%]">
          <Map1 coordinates={coordinates} setPlaces={setPlaces} />   
        </div>
        <div className="md:w-[35%]">
          <PlacesList places={places} />
        </div>
      </div>
    </>
  )
}

export default Service