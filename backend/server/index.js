const express = require('express');
const axios = require('axios');

const app = express();

const PORT = 3000;

app.use(express.static(__dirname + '/../../frontend/dist'));

app.use(express.json());

app.listen(PORT, () => {
  console.log('listening on port ', PORT);
});