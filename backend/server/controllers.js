const axios = require('axios');
const api_info = require('./config.js');

// const API_KEY = process.env.REACT_APP_API_KEY;
// axios.defaults.headers.common['Authorization'] = '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';

const API_KEY = api_info.API_KEY;
axios.defaults.headers.common['Authorization'] = API_KEY;

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-den';

const controllers = {

  getAllProducts: function (req, res) {

    axios
      .get(url + '/products')
      .then( (response) => {
        console.log(response.data);
      });
  }
};


module.exports.controllers = controllers;