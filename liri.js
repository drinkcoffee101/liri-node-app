/*=============================================
=            Imports            =
=============================================*/
//read and set any environment variables with the dotenv package
require("dotenv").config();

const keys = require("./keys.js");
const axios = require('axios');
const Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require("fs");
const chalk = require('chalk');

var spotify = new Spotify(keys.spotify);

/*=====  End of Imports  ======*/

/*=============================================
=            Console            =
=============================================*/
//get user input for function and argument 
let functionRequest = process.argv[2];
let userArg = process.argv.slice(3).join(' ');

/*=====  End of Console  ======*/

/*=============================================
=            Bands in town            =
=============================================*/
//Get below stuff 
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")
//MAKE SURE TO GET ALL OF THE USER INPUT LIKE IF THE NAME IS "MAT ZO"
let concertThis = (artist) => {
    //make api call
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (res) {
            var venueName = res.data[0].venue.name;
            var venueLocation = res.data[0].venue.city + ', ' + res.data[0].venue.region;
            //convert te format of the date 
            var eventDate = moment(res.data[0].datetime).format('L');
            console.log(chalk.bgBlue('Venue Name: ' + venueName +
                '\nVenue Location: ' + venueLocation +
                '\nDate of Event: ' + eventDate));

        })
        .catch(function (err) {
            console.error(err);

        })
}

/*=====  End of Bands in town  ======*/

/*=============================================
=            Spotify             =
=============================================*/
//Get the following 
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

//make api cal 
let spotifyThisSong = (song) => {
    spotify
        .search({ type: 'track', query: song, limit: 1 })
        .then(function (res) {
            var artistName = res.tracks.items[0].artists[0].name;
            var songName = res.tracks.items[0].name;
            var songLink = res.tracks.items[0]['external_urls'].spotify;
            var albumName = res.tracks.items[0].album.name;
            console.log(chalk.bgRed('Artist: ' + artistName,
                '\nSong Name: ' + songName,
                '\nSong Link: ' + songLink,
                '\nAlbum: ' + albumName))

        })
        .catch(function (err) {
            console.log(err);
        });

}

/*=====  End of Spotify   ======*/


/*=============================================
=            OMDB            =
=============================================*/
//Get the following 
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

let movieThis = (movie) => {
    //make api call
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (res) {
            console.log(chalk.bgGreen(
                'Movie Title: ' + res.data.Title +
                '\nYear Released: ' + res.data.Year +
                '\nIMDB Rating: ' + res.data.imdbRating +
                '\nRotten Tomatoes Rating: ' + res.data.Ratings[1].Value +
                '\nCountry: ' + res.data.Country +
                '\nLanguage: ' + res.data.Language +
                '\nPlot: ' + res.data.Plot +
                '\nActors/Actresses: ' + res.data.Actors
            ));
        })
        .catch(function (err) {
            console.error(err);
        })
}

/*=====  End of OMDB  ======*/




/*=============================================
=            function calls            =
=============================================*/

if (functionRequest == 'do-what-it-says') {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            console.error(err);

        }
        var textCmd = data.split(',')
        var request = textCmd[0];
        var newArg = textCmd[1];

        if (request == 'concert-this') {
            concertThis(newArg);
        }
        else if (request == 'spotify-this-song') {
            spotifyThisSong(newArg);
        }
        else if (request == 'movie-this') {
            movieThis(newArg);
        }
    })
}
else if (functionRequest !== 'do-what-it-says') {
    //if users types concert-this, will call the function 
    if (functionRequest == 'concert-this') {
        concertThis(userArg);
    }
    //if users types spotify-this-song, will call the function 
    else if (functionRequest == 'spotify-this-song') {
        //if the user does not enter a a song, print a default result 
        if (userArg == []) {
            var defaultSong = 'the sign';
            spotifyThisSong(defaultSong);
        }
        else {
            spotifyThisSong(userArg);
        }
    }
    else if (functionRequest == 'movie-this') {
        if (userArg == []) {
            var defaultMovie = 'mr. nobody';
            movieThis(defaultMovie);
        }
        else {
            movieThis(userArg);
        }
    }
    else {
        console.log('Sorry');
    }
}

/*=====  End of function calls  ======*/



