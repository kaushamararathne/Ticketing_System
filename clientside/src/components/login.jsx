// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? '/login' : '/register';
    try {
      const res = await axios.post(endpoint, { username, password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred.');
    }
  };

  return (    
      <div style={{ padding: 'auto' }}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br/><br/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br/><br/>
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
