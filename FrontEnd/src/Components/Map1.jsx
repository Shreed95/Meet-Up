import React, { useRef, useEffect, useState } from 'react';
import { useList } from '../context/List';
import { useType } from '../context/Type';
import { useRating } from '../context/Rating';
import mapboxgl from 'mapbox-gl';
import temp from '../Images/temp.png';
import { getPlacesData } from '../api/index';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Map = ({ coordinates, setPlaces }) => {
    const mapContainerRef = useRef(null);
    const [lng, setLng] = useState(coordinates.lng);
    const [lat, setLat] = useState(coordinates.lat);
    const [zoom, setZoom] = useState(15);
    const listState = useList();
    const typeState = useType();
    const ratingState = useRating();

    let data = null;

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [coordinates.lng, coordinates.lat],
            zoom: 15
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
                    data = await getPlacesData(typeState.type, map.getBounds()._sw, map.getBounds()._ne);
                    if(ratingState.rating!==''){
                        const filteredPlaces = data.filter((place)=>place.rating>ratingState.rating)
                        data=filteredPlaces;
                    }
                    setPlaces(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                const addMarkers = () => {
                    if (data) {
                        data.forEach((place) => {
                            if (
                                place &&
                                place.longitude !== undefined &&
                                place.latitude !== undefined &&
                                !isNaN(place.longitude) &&
                                !isNaN(place.latitude)
                            ) {
                                const popupContent = `<div><h1>${place.name}</h1><img
                                src=${place.photo ? place.photo.images.large.url : temp}
                                alt={place.name}
                              /></div>`;
                                const popup = new mapboxgl.Popup({ offset: 25 })
                                    .setHTML(popupContent)
                                    .setMaxWidth("100px");
                                new mapboxgl.Marker({
                                    color: "#0000FF"
                                })
                                    .setLngLat([Number(place.longitude), Number(place.latitude)])
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

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(0));
        });

        return () => map.remove();
    }, [coordinates]);

    return (
        <div style={{ position: 'relative' }} className='p-8'>
            <div className='bg-[#E0CCBE]  bg-opacity-50 text-gray-700 p-4 font-mono z-10 absolute left-0 m-6  rounded-md w-auto md:w-[400px] font-bold'>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div className='md:h-screen h-[370px] ' style={{ position: 'relative' }} ref={mapContainerRef}>
                <div className='bg-gray-400 bg-opacity-50 font-mono z-10 absolute bottom-0 right-0 m-2 mb-16 rounded-md w-auto'>
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
