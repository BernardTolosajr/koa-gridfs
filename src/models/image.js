var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  name: { type: String, required: true, unique: true}
});

mongoose.model('Image', ImageSchema);

