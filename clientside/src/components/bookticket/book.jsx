// CreateTicket.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Newticket = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    occupation: '',
    contactNumber: '',
    ticketHeading: '',
    description: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/tickets', formData);
      setSuccessMessage('Ticket created successfully!');
      setFormData({
        clientName: '',
        email: '',
        occupation: '',
        contactNumber: '',
        ticketHeading: '',
        description: ''
      });
    } catch (error) {
      setErrorMessage('Error creating ticket.');
      console.error(error);
    }
  };

  return (
    <div className="container m-5">
      <h2 className="text-xl font-bold mb-4">Create Ticket</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={handleChange}
          className="border p-2 w-5 mt-1"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
          required
        />
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
          required
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
          required
        />
        <input
          type="text"
          name="ticketHeading"
          placeholder="Ticket Heading"
          value={formData.ticketHeading}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 mt-1"
          required
        />
        
        <button
          type="submit"
          className="bg-blue-500 text-black rounded mt-4"
        >
          Create Ticket
        </button>
      </form>

      {successMessage && (
        <p className="mt-2 text-green-600">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mt-2 text-red-600">{errorMessage}</p>
      )}
    </div>
    
  );
};

export default Newticket;
