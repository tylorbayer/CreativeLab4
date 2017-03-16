var express = require('express');
var fs = require('fs');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('ratingFinder.html', { root:  'public' });
});

router.get('/getMovie',function(req,res,next) {
  fs.readFile(__dirname + '/movies.txt',function(err,data) {
  if(err) throw err;
  var movies = data.toString().split("\n");
  var myRe = new RegExp("^" + req.query.q);
  var jsonresult = [];
  for(var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    var result = movie.search(myRe);
    if(result != -1) {
    jsonresult.push({city:movie});
    }
  }
  res.status(200).json(jsonresult);
  });
});

router.get('/getMovieRating',function(req,res,next) {
  fs.readFile(__dirname + '/ratings.txt',function(err,data) {
  if(err) throw err;
  var moviesAndRatings = data.toString().split("\n");
  var jsonresult = [];
  for(var i = 0; i < moviesAndRatings.length; i++) {
    if (moviesAndRatings[i] == req.query.q) {
        console.log(moviesAndRatings[i]);
        jsonresult.push({rating:moviesAndRatings[i-1]});
    }
  }
  res.status(200).json(jsonresult);
  });
});

module.exports = router;
