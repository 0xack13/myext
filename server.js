var express  = require('express');
var app      = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});


var myexts = mongoose.model('myext', {
	name : String,
	ext  : String
});

app.get('/api/myext', function(req, res) {

	myexts.find(function(err, myext) {

		if (err)
			res.send(err)

		res.json(myext);
	});
});

// Find record by Name
app.get('/api/myext/:myextname', function(req, res) {

	myexts.find({
		name : req.params.myextname
	}, function(err, myext) {

		if (err)
			res.send(err)

		res.json(myext);
	});
});

app.get('/api/myextbyNum', function(req, res) {

	myexts.find(function(err, myext) {

		if (err)
			res.send(err)

		res.json(myext);
	});
});

// Find record by extension
app.get('/api/myextbyNum/:myextext', function(req, res) {

	myexts.find({
		ext : req.params.myextext
	}, function(err, myext) {

		if (err)
			res.send(err)

		res.json(myext);
	});
});

app.post('/api/myext', function(req, res) {

	myexts.create({
		name : req.body.name,
		ext : req.body.ext,
		done : false
	}, function(err, myext) {
		if (err)
			res.send(err);

		myexts.find(function(err, myext) {
			if (err)
				res.send(err)
			res.json(myext);
		});
	});

});

// delete
app.delete('/api/myext/:myext_id', function(req, res) {
	myexts.remove({
		_id : req.params.myext_id
	}, function(err, myext) {
		if (err)
			res.send(err);

		myexts.find(function(err, myext) {
			if (err)
				res.send(err)
			res.json(myext);
		});
	});
});

app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});


app.listen(8080);
console.log("App listening on port 8080");