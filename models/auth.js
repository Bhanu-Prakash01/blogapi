const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  username: {
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
  },
  isadmin: {
    type: Boolean,
    default:false
  }
});


const Auth = mongoose.model('Auth', AuthSchema);

module.exports = Auth;