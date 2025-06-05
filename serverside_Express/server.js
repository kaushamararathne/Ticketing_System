const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');

const { User } = require('./models');

const app = express();
app.use(cors());
const port = 5000;


const mongoose = require('mongoose');
const DB_URI = 'mongodb+srv://root:Qazwsx321@crudapp.vv0dkxv.mongodb.net/?retryWrites=true&w=majority&appName=crudapp';
mongoose.connect(DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('db connection error', err));

//app.use(cors()); // You can configure it to allow specific origins if needed

// Middleware
app.use(bodyParser.json());

const SECRET_KEY = "my_super_secret_key_123!";

// Use the routes
const ticketroutes= require('./routes/client');
const admin = require('./routes/admin');

app.use('/tickets',authenticateToken, ticketroutes); 
app.use('/admin',authenticateToken, admin);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
  {
    id: user._id,
    fname: user.name,
    lname: user.lname,
    email: user.email,
    role: user.empType
  },
  SECRET_KEY,
  { expiresIn: "1h" }
);

    res.json({         
          token: token
});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/status', (req, res) => {res.send('Server is running and APIs are live!');});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});