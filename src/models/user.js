var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true, unique: true},
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

mongoose.model('User', UserSchema);


