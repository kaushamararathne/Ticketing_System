import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './components/login';
import Home from './components/home';
import Newticket from './components/bookticket/book'

function App() {
  return (
    <div className="container-lg mt-5">
        <BrowserRouter>
      
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <h3>Ticket management system</h3>
      <h3> </h3>
        <Link to="/">Home</Link> | <Link to="/">Staff</Link> | <Link to="/">About</Link>
      </nav>
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/newticket" element={<Newticket />} />
        <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}


export default App;
