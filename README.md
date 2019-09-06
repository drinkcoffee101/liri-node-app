# liri-node-app


## Objective:

#### Build a small Speech Interpretation and Recognition Interface as a command line application. 

## Organization:

1. Obtain function and search parameters 
2. Perform a search for information on a song, artist concert, or movie


## Instructions   

### Available commands: 

userArg = artist/movie/song to search for

1. node liri.js do-what-it-says
    -Perfoms one of the commands and uses search item provided in the random.txt file
2. node liri.js concert-this userArg
    -Returns upcoming concert info
3. node liri.js spotify-this-song userArg
    -Returns song composer, link, and album
4. node liri.js movie-this userArg
    -Returns movie info




## Links            

For an example of the running app open the 'app-demo' picture:

![](/app-demo.png)

Github repo: https://github.com/drinkcoffee101/liri-node-app 



## Technologies Used            
### Node Packages
* Axios
* Chalk
* Dotenv
* Moment
* Node-spotify-api

