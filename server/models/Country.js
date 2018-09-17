const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The country name is required'],
    minlength: 1
  },
  capitals: {
    type: [String],
    default: []
  },
  area: {
    type: Number,
  },
  description: {
    type: String,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;