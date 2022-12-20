const express = require("express");
const app = express();
const https = require("node:https");

app.use(express.json());
//BodyParser
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let query = req.body.cityName;
  let apiKey = "5b49278db15afebb6889a4022afe301e"
  let unit = "metric"
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function (response) {
    console.log(response);
    response.on("data", function (data) {
      let weatherData = JSON.parse(data);
      let temp = weatherData.main.temp;
      let discripcion = weatherData.weather[0].description;
      let icon = weatherData.weather[0].icon;
      let imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature in " + query + " is currently " + temp + " degrees Celcius.</h1>");
      res.write("<h3>Weather discription: " + discripcion + "</h3>")
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
