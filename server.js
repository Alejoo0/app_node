require('dotenv').config();
const http    = require('http');
const express = require('express');
const RED     = require('node-red');

const app    = express();
const server = http.createServer(app);

const settings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/api",
  userDir: "./",
  flowFile: 'flows.json',
  credentialSecret: process.env.CREDENTIAL_SECRET || 'your-local-secret-key',
  functionGlobalContext: {}
};

RED.init(server, settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

const PORT = process.env.PORT; // cPanel asigna el puerto automáticamente

server.listen(PORT, function() {
  console.log(`Node-RED running on port ${PORT}`);
});

RED.start();