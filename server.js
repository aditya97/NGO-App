
const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
app.set('view engine', 'ejs');


var db, result

MongoClient.connect('mongodb://adityag:adityag@ds019866.mlab.com:19866/aca-ngo', function(err, database){
	if (err) 
		return console.log(err);
	db = database;
	app.listen(3000, function () {
  		console.log('Example app listening on port 3000!')
	})
})




app.use(bodyparser.urlencoded({extended:true}))
app.get('/', function(req, res){
	var cursor = db.collection('ngo').find();
	db.collection('ngo').find().toArray(function(err, result) {
		console.log(result)
		res.render('index.ejs', {ngo: result}) ;
	})
	
})


app.post('/add', function(req, res){
	db.collection('ngo').save(req.body, function(err, result){
		if(err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
})
