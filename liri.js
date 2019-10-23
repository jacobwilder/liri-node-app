// Acquires Spotify API keys
require("dotenv").config();

// Acquires all keys in keys.js
var keys = require("./keys.js");

// Forces page to require axios package
var axios = require("axios");

// Spotify npm package
var Spotify = require("node-spotify-api");

// Moment npm package
var moment = require("moment");

//File System package
var fs = require("fs");

// Pulls keys from .env file
var spotify = new Spotify(keys.spotify);

// Saves users action choice
var action = process.argv[2];

// saves users value
var value = process.argv.slice(3).join(" ");

// Creates command line arguments for multiple functions
switch(action) {
    case "concert-this":
        bandsInTown();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieSearch();
        break;
    case "do-what-it-says":
        randomCall();
        break;
};

// ------------------------------ BANDSINTOWN FUNCTION ------------------------------
function bandsInTown() {

    var bandsUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

    axios.get(bandsUrl).then(
        function(response) {
        // console.log(bandsUrl);
        // console.log(response.data[0]);
        console.log("------------------");
        console.log("Venue Name: " + response.data[0].venue.name);
        console.log("------------------");
        console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
        console.log("------------------");
        console.log("Event Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        console.log("------------------");
        })
        .catch(function(error) {
          if (error.response) {

            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {

            console.log(error.request);
          } else {

            console.log("Error", error.message);
          }
          console.log(error.config);
        });
}

// ------------------------------ SPOTIFY FUNCTION ------------------------------
function spotifyThis() {

    if (!value) {
        console.log("You didn't pick anything! Listen to this!");
        value = "The Sign";
    }

    spotify.search({type: "track", query: value}, (err, data) => {
      if (err) {
        return console.log("ERROR REPORTED: " + err);
      }
    var spotifyData = data.tracks.items;

      console.log("Artist(s): ", spotifyData[0].artists[0].name);
      console.log("------------------");
      console.log("Song Name: ", spotifyData[1].name);
      console.log("------------------");
      console.log("Preview link: ", spotifyData[0].artists[0].external_urls.spotify);
      console.log("------------------");
      console.log("Album Name: ", spotifyData[0].album.name);
      console.log("------------------");
  
    });
}

// ------------------------------ OMDB FUNCTION ------------------------------
function movieSearch() {

    if (!value) {
        console.log("You didn't pick anything! Try Mr. Nobody!");
        console.log("It's on Netflix!");
        value = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
        // console.log(queryUrl);
        console.log("------------------");
        console.log("Title: " + response.data.Title);
        console.log("------------------");
        console.log("Release Year: " + response.data.Year);
        console.log("------------------");
        console.log("Actors: " + response.data.Actors);
        console.log("------------------");
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("------------------");
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("------------------");
        console.log("Language: " + response.data.Language);
        console.log("------------------");
        console.log("Plot: " + response.data.Plot);
        console.log("------------------");
        console.log("Country: " + response.data.Country);
        console.log("------------------");
        })
        .catch(function(error) {
          if (error.response) {

            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {

            console.log(error.request);
          } else {

            console.log("Error", error.message);
          }
          console.log(error.config);
        });

}

// ------------------------------ RANDOM TEXT FUNCTION ------------------------------
function randomCall() {
  fs.readFile("random.txt", "utf8", (err, data) => {
    if (err) {
        console.log("ERROR REPORTED: ", err);
    }
    var dataArray = data.split(",");
    action = dataArray[0];
    value = dataArray[1];

    if (action === "concert-this") {
        bandsInTown(value);
    }
    else if (action === "spotify-this-song") {
        spotifyThis(value);
    } else {
        movieSearch(value);
    }
});
}