var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = require('../../src/models/image');

var ProductSchema = new Schema({
  _user: { type: Schema.ObjectId, ref: 'User' },
  name: { type: String, required: true, unique: true},
  price: { type: Number, required: true},
  images: [Image.schema]
});

mongoose.model('Product', ProductSchema);
