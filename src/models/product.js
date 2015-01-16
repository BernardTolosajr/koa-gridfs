var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = require('../../src/models/image');

console.log(image);

var ProductSchema = new Schema({
  name: { type: String, required: true, unique: true},
  price: { type: Number, required: true}
});

mongoose.model('Product', ProductSchema);
