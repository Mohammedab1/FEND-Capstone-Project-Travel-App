const dotenv = require("dotenv");
dotenv.config();

//Geonames, Prixau, and weatherbit API's and urls
//Geonames
//Add city after geonames
const geonames="http://api.geonames.org/search?q="
const geonamesFAPI = "&username="+process.env.geonamesAPI+"&type=json";
//Proxi
const prixauFAPI = "https://pixabay.com/api/?key="+process.env.prixauAPI+"&q="
// TODO: makesure to insert city name BEFORE "prixa"
const prixa = "&lang=en&image-type=photo";
//weatherbit
const weather = "http://api.weatherbit.io/v2.0/forecast/daily?&";
const weaherlat = "lat=";
const weatherlog = "&lon=";
const weatherFAPI = "&key="+process.env.weathAPI;

const projectdata = {};
var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));

// geonames Finction
const Gurl = async (city) => {

  const FUllUrl = geonames + city + geonamesFAPI ;
  const res = await fetch(FUllUrl);
  try {
    const MData = await res.json();
    return MData;
  } catch (err) {
    console.log("Error: " + err);
  }
};

// Proxi Finction
const Purl = async (city) => {

  const FUllUrl = prixauFAPI + city + prixa ;
  const res = await fetch(FUllUrl);
  try {
    const MData = await res.json();
    return MData;
  } catch (err) {
    console.log("Error: " + err);
  }
};

// Weather Finction
const Wurl = async (WeatheData) => {

  const FUllUrl = weather + weaherlat+ WeatheData.lat + weatherlog + WeatheData.lng + weatherFAPI ;
  console.log(FUllUrl);
  const res = await fetch(FUllUrl);
  try {
    const MData = await res.json();
    return MData;
  } catch (err) {
    console.log("Error: " + err);
  }
};

//get the root to sent the html page
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});


// Api calls for the 3 APIs with passing user input
app.post("/genoames", function(req, res){

  const geoData = Gurl(req.body.city).then (function(rese){
    res.json(rese)
  })
})
app.post("/proxi", function(req, res){

  const geoData = Purl(req.body.city).then (function(rese){
    res.json(rese)
  })
})
app.post("/weather", function(req, res){

  // console.log("123");
  const geoData = Wurl(req.body.WeatheData).then (function(rese){
    res.json(rese);
  })
})

const port = 3000
app.listen(port, function (){
  console.log("The server is running on port " + port);
});
