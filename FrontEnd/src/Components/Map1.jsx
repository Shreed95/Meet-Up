import React, { useRef, useEffect } from 'react';
import { useList } from '../context/List';
import { useType } from '../context/Type';
import mapboxgl from 'mapbox-gl';
import { getPlacesData1 } from '../api/index';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Map = ({ coordinates, setPlaces }) => {
    const mapContainerRef = useRef(null);
    const listState = useList();
    const typeState = useType();

    let data = [];

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [coordinates.lng, coordinates.lat],
            zoom: 13
        });
        new mapboxgl.Marker({ color: '#FFD700' }).setLngLat([coordinates.lng, coordinates.lat]).addTo(map);

        let c = 0;
        listState.list.forEach((i) => {
            if (c === 0) {
                const popup = new mapboxgl.Popup({ offset: 25 }).setText(i.name);
                new mapboxgl.Marker({ color: '#FF0000' }).setLngLat([i.lng, i.lat]).setPopup(popup).addTo(map);
                c++;
            }
            else {
                const popup = new mapboxgl.Popup({ offset: 25 }).setText(i.name);
                new mapboxgl.Marker({ color: '#00FF00' }).setLngLat([i.lng, i.lat]).setPopup(popup).addTo(map);
            }
        })

        map.on('load', async () => {
            const updateDataAndMarkers = async () => {
                try {
                    data = await getPlacesData1(typeState.type, coordinates.lat, coordinates.lng, 5000);
                    setPlaces(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                const addMarkers = () => {
                    if (data) {
                        data.forEach((place) => {
                            if (place) {
                                const popupContent = `<div><h1>${place.properties.name}</h1></div>`;
                                const popup = new mapboxgl.Popup({ offset: 25 })
                                    .setHTML(popupContent)
                                    .setMaxWidth("100px");
                                new mapboxgl.Marker({
                                    color: "#0000FF"
                                })
                                    .setLngLat(place.geometry.coordinates)
                                    .setPopup(popup)
                                    .addTo(map);
                            }
                        });
                    }
                };
                addMarkers();
            };
            updateDataAndMarkers();
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        return () => map.remove();
    }, [coordinates]);

    return (
        <div style={{ position: 'relative' }} className='p-4 bg-slate-900'>
            <div className='md:h-screen h-[370px] rounded-md' style={{ position: 'relative' }} ref={mapContainerRef}>
                <div className='bg-gray-300 bg-opacity-50 font-mono z-10 absolute bottom-0 right-0 m-2 mb-16 rounded-md w-auto'>
                    <ul className="w-auto p-0 md:p-2 text-gray-700 font-bold text-sm md:text-lg">
                        <li className="flex items-center">
                            <div className="w-4 h-4 mr-2 bg-[#FFD700] rounded-full"></div>
                            <span>Center</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-4 h-4 mr-2 bg-[#FF0000] rounded-full"></div>
                            <span>Your Location</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-4 h-4 mr-2 bg-[#00FF00] rounded-full"></div>
                            <span>Friends's Location</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-4 h-4 mr-2 bg-[#0000FF] rounded-full"></div>
                            <span>Recommended Places</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Map;
