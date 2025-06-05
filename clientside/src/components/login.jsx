import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adjust path if needed

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setToken } = useAuth(); // Get token setter from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token); // Automatically decodes & sets user via AuthContext

      const role = response.data.role || JSON.parse(atob(token.split('.')[1])).role;

      // Role-based routing
      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'SUPERVISOR') navigate('/supervisor');
      else if (role === 'L1ENGINEER') navigate('/l1engineer');
      else if (role === 'L2L3ENGINEER') navigate('/l2l3engineer');
      else navigate('/');

    } catch (err) {
      alert("Login failed! " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input type="text" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;