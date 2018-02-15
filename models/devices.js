var mongoose = require('mongoose');
var form = require('./emergencyform');

var deviceSchema = new mongoose.Schema({
	latitude:Number,
	longitude:Number,
	acceptedTime:String
});


var devices =  mongoose.model("devices", deviceSchema);

// devices.create({
// 	service:"police",
// 	location:"uppal"
// })
module.exports= devices;
