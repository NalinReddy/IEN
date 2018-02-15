var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express(),
    methodOverride = require('method-override'),
    db = require('./models'),
    devices = require('./models/devices');

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
var publicPath = path.join(__dirname, '/views/assets');
app.use(express.static(publicPath));
app.use(methodOverride('_method'));
//************
//Home Page
//*************
app.get("/", function(req, res){
	
	db.form.find()
	.then(function(result){
		let array = result.slice().reverse();
		res.render("index",{data:array})
     })
	.catch(error => console.log(error));
})

//************
//create emergency request
//*************

app.post("/", function(req, res){
	 console.log(req.body,req.body.ambulance);
	 var time = new Date();

var currentTime= time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

	db.form.create({
		emergency:req.body.type,
		name:req.body.personName,
		phoneNumber:req.body.contactNumber,
        address:req.body.address,
        landmark:req.body.landmark,
        pincode:req.body.pincode,
        ambulance:req.body.ambulance,
        police:req.body.police,
        fire:req.body.fire,
        time:currentTime
	}).then(newData => res.redirect("/"))
	  .catch(error => console.log(`failed inserting data into database `+error) );
	  // res.redirect("/");
})
//location, if accepts any request send to server and update its schema and also update type of request accepted and time when it was accepted,then push these values to emergency
//schema using findOne({_id:req.params.id})

//************
//iterate all the request
//*************
app.get("/list", function(req, res){
      db.form.find().then(result => res.render("list",{data:result}))
      .catch(error => console.log(error));
})
//************
// delete a request
//*************
app.delete("/list/:id", function(req, res){
	db.form.findByIdAndRemove(req.params.id, function(error){
		if(error){
			res.redirect("/");
		}
	})
	res.redirect("/")
})
//************
//iterate all the request for service
//*************
app.get("/list/service", function(req, res){
	 db.form.find().then(result => res.render("service",{data:result}))
      .catch(error => console.log(error));
	// res.render("service")
})

app.post("/list/service/:id", function(req, res){
	console.log(req.body);
	var time = new Date();

var currentTime= time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
   //      devices.create({
   // 	latitude:req.body.latitude,
   // 	longitude:req.body.longitude,
   // 	acceptedTime:currentTime
   // }).then(newData => console.log(newData))
   // .catch(err=>console.log(err))
        var data;

   if(req.body.ambulance){
      data={ambulance:req.body.ambulance},
      location={
      	latitude:req.body.latitude,
     	longitude:req.body.longitude,
    	acceptedTime:currentTime
      }
   }
   if(req.body.police){
   	data={police:req.body.police},
    location={
      	latitude:req.body.latitude,
     	longitude:req.body.longitude,
    	acceptedTime:currentTime
      }
   }
  if(req.body.fire){
   	data={fire:req.body.fire},
   	location={
      	latitude:req.body.latitude,
     	longitude:req.body.longitude,
    	acceptedTime:currentTime
      }
   }
   
  db.form.findByIdAndUpdate(req.params.id,data,function(err, updated){
  	if(err){
  		console.log("error in updating values");
  	}
  	else{
  		console.log(updated);
  		res.redirect("/list")
  	}
  })
})





app.listen(process.env.PORT || 3000,function(err){
    if(err){
    	console.log(err);
    }else{
    	console.log("connection to server is successfull");
    }
});