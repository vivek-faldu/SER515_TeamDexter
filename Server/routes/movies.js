var express = require("express");
var router = express.Router();
var {
  getMovieList
} = require("../services/getMovieList");
var {
  getMovieDetail
} = require("../services/getMovieDetail");
var {
  getUpcomingMovies
} = require("../services/getUpcomingMovies");
var {
  getMovieSearch
} = require("../services/getMovieSearch");

// GET home page and show list of movies.
router.get("/", function (req, res, next) {
  let type = req.query.type;
  let page = req.query.page;

  if (typeof (type) === 'undefined') {
    type = 'popular'
  }
  if (typeof (page) === 'undefined') {
    page = 1
  }

  switch (type) {
    case 'popular':
      getMovieList(page)
        .then(movie => {
          res.json(movie);
        })
        .catch(err => {
          console.log("got error from movielist service", err);
        });
      break;
    case 'upcoming':
      getUpcomingMovies(page)
        .then(movie => {
          res.json(movie);
        })
        .catch(err => {
          console.log("Error  fetching from upcoming movies list", err);
        })
      break;
    case 'search':
      let movieName = req.query.name;
      getMovieSearch(movieName)
        .then(movie => {
          res.json(movie);
        })
        .catch(err => {
          console.log("Error  fetching from upcoming movies list", err);
        })
      break;

    default:
      res.send("bye")
  }
});

// GET movie details for a specific movie. 
router.get("/:id", function (req, res, next) {
  getMovieDetail(req.params.id)
    .then(movie => {
      res.send(movie);
    })
    .catch(err => {
      console.log("got error from movielist service", err);
    });
});

module.exports = router;