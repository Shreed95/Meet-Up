import React from 'react';
import { useType } from '../context/Type';
import UpdateLocation from './UpdateLocation';
import SearchPlace from './SearchPlace';
function Filters() {
    const typeState = useType();

    return (
        <div>
            <div className='flex flex-col md:flex-row justify-center items-center'>
                
                <div className="w-72 mr-0 md:mr-10">
                    <label htmlFor="type" className="block text-sm font-medium text-black mb-1">Type</label>
                    <select
                        id="type"
                        value={typeState.type}
                        onChange={(e) => typeState.setType(e.target.value)}
                        className="py-2 px-3 rounded-md w-full focus:outline-none focus:ring focus:border-blue-200"
                    >
                        <option className='px-3 py-5' value="catering">Restaurants/Cafes/Bars/Pubs</option>
                        <option className='px-3 py-5' value="accommodation">Hotels/Guest House/Motels</option>
                        <option className='px-3 py-5' value="entertainment">Attractions</option>
                        <option className='px-3 py-5' value="leisure">Picnic/Playgrounds/Park</option>
                        <option className='px-3 py-5' value="tourism">Tourist Attractions</option>
                        <option className='px-3 py-5' value="religion">Religious Places</option>
                        <option className='px-3 py-5' value="sport">Sport Center/Track/Stadiums</option>
                    </select>
                </div>
                <SearchPlace />
            </div>
           
            <div className='flex justify-center items-center'>
                <UpdateLocation />
            </div>
        </div>
    )
}

export default Filters