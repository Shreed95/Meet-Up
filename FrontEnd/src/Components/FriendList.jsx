import React, { useState, useEffect } from 'react';
import Search from '../Components/Search';
import { useList } from '../context/List';
import { getAddress } from '../api';
import { useAuthContext } from '../hooks/useAuthContext';

function FriendList() {
    const [onSelect, setonSelect] = useState('');
    const [addresses, setAddresses] = useState([]);
    const listState = useList();
    const { user } = useAuthContext();


    useEffect(() => {
        const fetchInitialLocation = async () => {
            const initialUser = JSON.parse(localStorage.getItem('user')).name;
            if (initialUser) {
                try {
                    const response = await fetch("http://localhost:5000/api/displaylocation", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.authToken}`
                        },
                        body: JSON.stringify({
                            name: initialUser
                        })
                    });

                    const json = await response.json();

                    if (!json.success) {
                        alert("Location not Found");
                    } else {
                        listState.setList([json]);
                    }
                } catch (error) {
                    console.log('Error fetching location:', error);
                }
            }

        };
        if (user) {
            fetchInitialLocation();
        }
    }, []);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/displaylocation", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.authToken}`
                    },
                    body: JSON.stringify({
                        name: onSelect
                    })
                });

                const json = await response.json();

                if (!json.success) {
                    if (onSelect.trim() !== '') {
                        alert("Location not Found");
                    }
                } else {
                    listState.setList(prevItems => [...prevItems, json])
                }
            } catch (error) {
                console.log('Error fetching location:', error);
            }
        };
        if (user) {
            fetchLocation();
        }
    }, [onSelect]);

    useEffect(() => {
        const updateAddresses = async () => {
            const updatedAddresses = await Promise.all(
                listState.list.map(async (item) => {
                    return getAddress(item.lng, item.lat);
                })
            );
            setAddresses(updatedAddresses);
        };

        updateAddresses();
    }, [listState.list]);

    return (
        <>

            <div className='flex flex-col items-center'>
                <p className='mt-16 text-3xl font-bold text-black'>Make a Friend List</p>
                <Search setonSelect={setonSelect} />
                <div className="">
                    <table className="w-auto border border-gray-300 mt-5 mb-5">
                        <thead>
                            <tr className='bg-yellow-200'>
                                <th className="py-2 px-4 sm:px-9 lg:px-16 border-b">Name</th>
                                <th className="py-2 px-4 sm:px-9 lg:px-16 border-b">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listState.list.map((item, index) => (
                                <tr key={index} className='bg-slate-700'>
                                    <td className="py-2 px-4 sm:px-2 lg:px-16 border-b text-center text-white">{item.name}</td>
                                    <td className="py-2 px-4 sm:px-2 lg:px-16 border-b text-center text-white">{addresses[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </>
    );
}

export default FriendList;