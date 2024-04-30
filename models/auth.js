const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
      type: String,
      required: true
  },
  time: {
      type: Date,
      default:Date.now()
  }
});


const Auth = mongoose.model('Auth', AuthSchema);

module.exports = Auth;