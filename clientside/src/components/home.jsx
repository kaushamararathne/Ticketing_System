import React from 'react';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/newticket');
  };
  const handleClick2 = () => {
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <button onClick={handleClick1}>create a ticket</button>
      <button onClick={handleClick2}>login</button>
    </div>
  );
};

export default Home;
