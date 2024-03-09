import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function UpdateLocation() {
    const { user } = useAuthContext();
    const [ans, setAns] = useState(false);
    const getLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (position && position.coords) {
                        console.log(position)
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        resolve({ latitude, longitude });
                    } else {
                        reject(new Error('Could not get location coordinates.'));
                    }
                },
                (error) => {
                    reject(new Error(`Error getting location: ${error.message}`));
                }
            );
        });
    };

    const updateLocation = async () => {
        try {
            const { latitude, longitude } = await getLocation();
            const response = await fetch("http://localhost:5000/api/updatelocation", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.authToken}`
                },
                body: JSON.stringify({
                    name: user.name,
                    lat: latitude,
                    lng: longitude
                })
            });

            if (!response.ok) {
                throw new Error(`Update location failed: ${response.statusText}`);
            }
            else {

                setAns(true);
            }
        } catch (error) {
            console.log('Error updating location:', error);
        }
    };

    return (
        <>
            {ans ? (
                <button className='text-white py-2 px-11 rounded bg-green-600  focus:outline-none focus:shadow-outline-blue text-center mt-12'
                    onClick={updateLocation}>
                    Location Updated
                </button>
            ) : (
                <button className=' text-white py-2 px-11 rounded hover:bg-[#4b73ab] bg-[#395886] focus:outline-none focus:shadow-outline-blue text-center mt-12'
                    onClick={updateLocation}>
                    Update Location
                </button>
            )}
        </>
    );
}

export default UpdateLocation;
