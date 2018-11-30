var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/midterm', { useNewUrlParser: true });
require('./models/Product');
var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});
var Product = mongoose.model('Product');

router.get('/products', function(req, res, next) {
  Product.find(function(err, products){
    if(err){ return next(err); }
    res.json(products);
  });
});

router.post('/products', function(req, res, next) {
  var product = new Product(req.body);
  product.save(function(err, product){
    if(err){ return next(err); }
    res.json(product);
  });
});

router.param('product', function(req, res, next, id) {
  var query = Product.findById(id);
  query.exec(function (err, product){
    if (err) { return next(err); }
    if (!product) { return next(new Error("can't find product")); }
    req.product = product;
    return next();
  });
});

router.get('/products/:product', function(req, res) {
  res.json(req.product);
});

router.put('/products/:product/order', function(req, res, next) {
  req.product.order(function(err, product){
    if (err) { return next(err); }
    res.json(product);
  });
});

router.delete('/products/:product', function(req, res) {
  console.log("In delete with " + req.product._id);
  db.collections['products'].deleteOne({ "_id": ObjectID(req.product._id) });
});
module.exports = router;
