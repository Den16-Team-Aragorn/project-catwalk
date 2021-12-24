const axios = require('axios');
const apiInfo = require('./config');

const { API_KEY } = apiInfo;
axios.defaults.headers.common.Authorization = API_KEY;

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-den';

const controllers = {

  // ============================================
  // PRODUCT HANDLERS
  // ============================================

  // get all products
  getAllProducts(req, res) {
    axios
      .get(`${url}/products`)
      .then((allProducts) => {
        res.status(200).send(allProducts.data);
      });
  },

  // get product info by its ID
  getProductById(req, res) {
    const productID = req.body.id;
    axios
      .get(`${url}/products/${productID}`)
      .then((product) => {
        res.status(200).send(product.data);
      });
  },

  // get a product style information
  getProductStyles(req, res) {
    const productID = req.body.id;
    axios
      .get(`${url}/products/${productID}/styles`)
      .then((styles) => {
        res.status(200).send(styles.data);
      });
  },

  // get all products related to a specific product
  getRelatedProducts(req, res) {
    const productID = req.body.id;
    axios
      .get(`${url}/products/${productID}/related`)
      .then((related) => {
        res.status(200).send(related.data);
      });
  },

  // ============================================
  // REVIEW HANDLERS
  // ============================================

  // get all reviews for a product
  getAllReviews(req, res) {
    const productID = req.body.id;
    axios
      .get(`${url}/reviews?product_id=${productID}`) // may need to modify to add count
      .then((review) => {
        res.status(200).send(review.data);
      });
  },

  // get review meta info for a product
  getReviewMeta(req, res) {
    const productID = req.body.id;
    axios
      .get(`${url}/reviews/meta?product_id=${productID}`)
      .then((metaInfo) => {
        res.status(200).send(metaInfo.data);
      });
  },

  // post a review for a product
  postReview(req, res) {
    axios
      .post(`${url}/reviews`, req.body)
      .then((postRes) => {
        res.status(200).send(postRes.data);
      });
  },

  // mark the review helpful
  markReviewHelpful(req, res) {
    const reviewID = req.body.review_id;
    axios
      .put(`${url}/reviews/${reviewID}/helpful`)
      .then((helpRes) => {
        res.status(204).send(helpRes.data);
      });
  },

  // report the review
  reportReviews(req, res) {
    const reviewID = req.body.review_id;
    axios
      .put(`${url}/reviews/${reviewID}/report`)
      .then((reportRes) => {
        res.status(200).send(reportRes.data);
      });
  },

};

module.exports.controllers = controllers;
