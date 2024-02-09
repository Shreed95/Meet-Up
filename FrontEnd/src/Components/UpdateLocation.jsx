import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function UpdateLocation() {
    const { user } = useAuthContext();
    const getLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (position && position.coords) {
                        const { latitude, longitude } = position.coords;
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

            // const data = await response.json();
            // console.log('Update location response:', data);
        } catch (error) {
            console.log('Error updating location:', error);
        }
    };

    return (
        <button className='text-white text-xl px-3 py-2 bg-yellow-400 mt-10 rounded-xl'
            onClick={updateLocation}>
            Update Location
        </button>
    );
}

export default UpdateLocation;
