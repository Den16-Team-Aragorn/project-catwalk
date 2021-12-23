const express = require('express');
const axios = require('axios');
const controllers = require('./controllers.js');

const app = express();

const PORT = 3000;

app.use(express.static(__dirname + '/../../frontend/dist'));

app.use(express.json());

// product request handlers
app.get('/api/products', controllers.controllers.getAllProducts);


// review request handlers


// cart request handlers


// interactions request handlers


app.listen(PORT, () => {
  console.log('listening on port ', PORT);
});