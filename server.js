const express = require('express');
const server = express();

// middleware
const helmet = require('helmet');
const cors = require('cors');

server.use(helmet());
server.use(cors());
server.use(express.json());

// routes
const authRoute = require('./routes/authorization/authorization');
const ticketRoute = require('./routes/tickets/tickets');

server.use('/api/auth/', authRoute);
server.use('/api/tickets/', ticketRoute);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to my api.' });
});

module.exports = server;
