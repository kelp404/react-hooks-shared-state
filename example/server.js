const http = require('http');
const path = require('path');
const config = require('config');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Launch server.
server.listen(config.server.port, config.server.host, () => {
  const {address, port} = server.address();
  console.log(`Server listening at http://${address}:${port}/react-hooks-shared-state`);
});
