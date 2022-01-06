/* eslint-disable no-console */
const path = require('path');
const axios = require('axios');
const express = require('express');
const API_KEY = require('./config');

const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-den';

const app = express();

const PORT = 3000;

app.use(express.static(`${__dirname}/../../frontend/dist`));

app.use(express.json());

app.use('/api/*', async (req, res) => {
  // console.log(API_KEY);
  const payload = axios({
    method: req.method.toLowerCase(),
    url: URL + req.originalUrl.slice(4),
    headers: { Authorization: API_KEY.API_KEY },
    data: req.body,
  }).then((response) => {
  res.send(response.data);
  }).catch((err) => {
    console.log('error in server', err)
    res.status(500).send(err)
  })
});

app.get('*', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, '../../frontend/dist'),
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port ', PORT);
});
