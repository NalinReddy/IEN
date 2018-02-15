var mongoose = require('mongoose');

    var ObjectId = mongoose.Schema.Types.ObjectId;

var formSchema = new mongoose.Schema({
    emergency: String,
    name: String,
    phoneNumber: Number,
    address: String,
    landmark: String,
    pincode: Number,
    ambulance:String,
    police:String,
    fire:String,
    currentTime:String,
    time:String,
    location:{type:ObjectId, ref:'devices'}

});

var form = mongoose.model("form", formSchema);

// form.create({
//     emergency: 'accident',
//     name: "sunny",
//     phoneNumber: 7386248578,
//     address: "hyderabad",
//     landmark: 'kukatpally',
//     pincode: 506009,
//     ambulance:'on',
//     police:'on',
//     fire:'on',
//     time:2,
//     acceptedTime:203,
// })


module.exports =form;








//type of emergency
//name
//phone number
//address
//landmark
//pincode
//alertTo: