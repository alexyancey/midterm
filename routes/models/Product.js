var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  title: String,
  price: {type: Number, default: 0},
  orders: {type: Number, default: 0},
  image: String
});
ProductSchema.methods.order = function(cb) {
  this.orders += 1;
  this.save(cb);
};
mongoose.model('Product', ProductSchema);
