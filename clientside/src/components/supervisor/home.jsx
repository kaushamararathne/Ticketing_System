import React, { useState } from 'react';
import axios from 'axios';

function Supervisor() {

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
        <h3>Supervisor Dashboard</h3>
    </div>
  );
}

export default Supervisor;
