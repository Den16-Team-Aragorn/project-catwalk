const express = require('express');
const controllers = require('./controllers');

const app = express();

const PORT = 3000;

app.use(express.static(`${__dirname}/../../frontend/dist`));

app.use(express.json());

// product request handlers
app.get('/api/products', controllers.controllers.getAllProducts);
app.get('/api/products/id', controllers.controllers.getProductById);
app.get('/api/products/styles', controllers.controllers.getProductStyles);
app.get('/api/products/related', controllers.controllers.getRelatedProducts);

// review request handlers
app.get('/api/reviews', controllers.controllers.getAllReviews);
app.get('/api/reviews/meta', controllers.controllers.getReviewMeta);
app.post('/api/reviews', controllers.controllers.postReview);
app.put('/api/reviews/helpful', controllers.controllers.markReviewHelpful);
app.put('/api/reviews/report', controllers.controllers.reportReviews);

// cart request handlers

// interactions request handlers

app.listen(PORT, () => {
  console.log('listening on port ', PORT);
});
