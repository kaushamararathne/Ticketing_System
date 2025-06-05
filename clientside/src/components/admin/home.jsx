import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Admin() {
   return (
   <div>
        <h3>Admin Dashboard</h3>
        <h4><Link to="/">Home</Link> | <Link to="/">Staff</Link> | <Link to="/">About</Link></h4>
        <h4><Link to="./addnewuser">Add a user</Link></h4> 
    </div>
  )};
export default Admin;
