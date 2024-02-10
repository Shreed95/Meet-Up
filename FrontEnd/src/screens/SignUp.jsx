import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position && position.coords) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        }
      },
      (error) => {
        console.log("Error getting Location:", error.message);
      }
    );
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: {
      lat: 0,
      lng: 0
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: {
          lat: latitude,
          lng: longitude
        }
      })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert(json.errors);
    }
    if (json.success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white p-8 rounded shadow-md flex flex-col justify-center items-center w-96">
        <img src={logo} alt="logo" className="w-14 text-center mb-6" />
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {latitude !== 0 && longitude !== 0 ? (
            <button
              type="button"
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-blue"
            >
              Location Fetched Successfully
            </button>
          ) : (
            <button
              type="button"
              onClick={getLocation}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline-blue"
            >
              Get Location
            </button>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white mt-3 py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Sign Up
          </button>
          <div className='mt-3'>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an Account ? <Link to='/login' className="font-medium text-blue-700 hover:underline">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>

  );
};

export default SignUp;
