var mongoose = require('mongoose');

var acceptSchema = new mongoose.Schema({
     service:String,
     time:Number
})

var acceptedModel = mongoose.model("accepted", acceptSchema);

module.exports = acceptedModel;