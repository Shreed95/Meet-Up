import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Components/NavBar';
import FriendList from '../Components/FriendList';
import Filters from '../Components/Filters';
import { useCenter } from '../context/Center';
import { useList } from '../context/List';

const Home = () => {
    const centerState = useCenter();
    const listState = useList();
    const navigate = useNavigate();

    const Algo = () => {
        if ((listState.list).length >= 3) {
            let ans = new Array(2);
            ans.fill(0);

            let n = listState.list.length;
            let signedArea = 0;

            for (let i = 0; i < n; i++) {
                let x0 = listState.list[i].lng;
                let y0 = listState.list[i].lat;
                let x1 = listState.list[(i + 1) % n].lng;
                let y1 = listState.list[(i + 1) % n].lat;

                let A = x0 * y1 - x1 * y0;
                signedArea += A;

                ans[0] += (x0 + x1) * A;
                ans[1] += (y0 + y1) * A;
            }

            signedArea *= 0.5;
            ans[0] = ans[0] / (6 * signedArea);
            ans[1] = ans[1] / (6 * signedArea);

            centerState.setCenter({ lng: ans[0], lat: ans[1] });

            navigate('/service');
        }
        else {
            alert("Friend List should have Atleast 3 Friends.")
        }

    }
    return (
        <>
            <Nav />
            <div>
                <div className='bg-[#bfcee5] flex flex-col md:flex-col justify-center items-center'>
                    <div className="w-full mt-16">
                        <Filters />
                    </div>
                    <div className='w-full'>
                        <FriendList />
                    </div>
                </div>
                <div className='flex justify-center items-center bg-[#bfcee5]   pt-12 pb-24'>
                    <button
                        type='button'
                        className='bg-[#395886] text-white py-2 px-11 rounded hover:bg-[#4b73ab]  focus:outline-none focus:shadow-outline-blue text-center'
                        onClick={Algo}>
                        Find Places
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;
