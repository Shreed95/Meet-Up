import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png';
import { useLogIn } from '../hooks/useLogin';

const Login = () => {
  const { login, error, isLoading } = useLogIn();
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.name, formData.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-slate-100
rounded-lg shadow-md backdrop-blur-5 border border-white/30 p-8  w-96 flex flex-col justify-center items-center">
        <img src={logo} alt="logo" className='w-14 text-center mb-6' />
        <h2 className="text-2xl font-semibold mb-4">Log In</h2>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              placeholder='Enter Username'
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              placeholder='Enter Password'
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-3xl hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Log-In
          </button>
          {error &&
            <div>
              {error}
            </div>
          }
          <div className='mt-3'>
            <p className="text-sm font-light text-gray-900 ">
              Don’t have an account yet? <Link to='/' className="font-medium text-blue-700 hover:underline">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
