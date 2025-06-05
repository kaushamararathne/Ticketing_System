import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // ✅ Adjust path as needed

function Addnewuser() {
  const { token } = useAuth(); // ✅ Get token from context
  const [formData, setFormData] = useState({
    name: '',
    lname: '',
    email: '',
    password: '',
    empType: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert('Not authorized');

    try {
      const response = await axios.post(
        'http://localhost:5000/admin/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('User added successfully!');
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lname" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="empType" onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="SUPERVISOR">SUPERVISOR</option>
          <option value="L1ENGINEER">L1ENGINEER</option>
          <option value="L2L3ENGINEER">L2L3ENGINEER</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default Addnewuser;
