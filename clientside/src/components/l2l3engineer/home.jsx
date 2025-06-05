import React, { useState } from 'react';
import axios from 'axios';

function L1l2engineer() {

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
        role
      });
      setToken(response.data.token);

      alert(`Login successful! as a ${role}`);
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div>
        <h3>L1engineer Dashboard</h3>
    </div>
  );
}

export default L1l2engineer;
