const fs = require('fs');
const express = require('express');
const NodeCache = require( "node-cache" );
const cors = require('cors');



const app = express();
app.use(cors());

const bigMacIndex = fs.readFileSync('big-mac-index.json');
const bigMacIndexJson = JSON.parse(bigMacIndex);
// Initializing a local cache of the big mac index on init
/**
 * NOTE : we are only storing to the cache the latest data 
 * from the csv which is stored in the local file as Json.
 */
const bigMacCache = new NodeCache();
const bigMaCountryList  = [];
bigMacIndexJson.map((countryData, i ) =>{
    bigMacCache.set(countryData.Country, countryData, 10000);
    bigMaCountryList[i] = countryData.Country;
});




app.get('/getBigMacIndex', function (req, res) {
    res.send(bigMacCache.keys());
    // res.send(bigMacCache.mget());
});

app.get('/getRate', function (req, res) {
    const country = req.param("country");
    res.send(bigMacCache.get(country));
});

//get random coutry which different from user location (country)
app.get('/getRandom', function (req, res) {
    const otherThanCountry = req.param("country");
    res.send(bigMacCache.get(getRandomCountry(otherThanCountry)));
});


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function getRandomCountry(otherThanCountry){
    const randomIndex = getRandomInt(bigMaCountryList.length);
    const country = bigMaCountryList[randomIndex];
    if(country === otherThanCountry){
        getRandomCountry(otherThanCountry)
    } else {
        return country;
    }
}
app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});