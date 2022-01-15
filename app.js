
const express = require("express"); //Turn on tree Splitting
const https = require("https");
const bodyParser = require("body-parser");

const app = express(); //initalise a new express app

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){ // app is using express to get the root directoty, then a function executes and has parameters that need to have a request and response which is at the end of this code block
  res.sendFile(__dirname + "/index.html")

});

app.post("/", function(req, res){
  console.log(req.body.cityName); // bodyparser will get on post request what data was sent in city name form in the html
  const apiKey = ""
  const query = req.body.cityName;
  const unit = "imperial"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit; //Url for API data

  https.get(url, function (response){ // https.get is using https module. url is required as the first parameter and a anonymous function for the second needs a callback. "response.on" is being called back as the 2ns paremeter.
    console.log(response.statusCode); // Logging status code, statusCode is an object of "response"

    response.on("data", function(data){ // response.on needs data,
      const weatherData = JSON.parse(data) //json.parse method is changing the hex code into readable json
      const temp = weatherData.main.temp //temp variable equals weatherData's JSON parsed data and now is digging in the "main" key and getting the temp object of "main"
      const weatherDescripton = weatherData.weather[0].description //
      const icon = weatherData.weather[0].icon
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
      res.write(`<p>The Weather is currently ${weatherDescripton}<p>`)
      res.write(`<h1>the tempature in Akron is ${temp}`)
      res.write("<img src="+ imgURL + ">")
      res.send();

    });
  });
});



app.listen(3000, function(){
  console.log("server is running on port 3000.");
});
