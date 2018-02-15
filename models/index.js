var mongoose = require('mongoose');
var form = require('./emergencyform');
mongoose.set('debug', true);
mongoose.connect('mongodb://nalin:nalin@ds143738.mlab.com:43738/ien');

mongoose.Promise = Promise;

module.exports.form = require('./emergencyform');
