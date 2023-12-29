const express = require("express");
const app = express();
const bodyParser=require("body-parser");
const fetch=require("node-fetch");
app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();
app.use(express.static('public'))
app.set("view engine","ejs");


app.get("/", (req, res) => {
    const sendData={location:"Location",country:"",temp:"Temp",des:"Description",feel:"Feel-like",humidity:"Humidity",speed:"speed"};
    res.render("index",{sendData:sendData});

});
app.post("/",async(req,res)=>{
    let location=await req.body.city;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
    const response=await fetch(url);
    const weatherData=await response.json();
    const temp=Math.floor(weatherData.main.temp);
    const desc=weatherData.weather[0].description;
    const sendData={};
    sendData.temp=temp;
    sendData.desc=desc;
    sendData.location=location;
    sendData.feel=weatherData.main.feels_like;
    sendData.humidity=weatherData.main.humidity;
    sendData.speed=weatherData.wind.speed;
    sendData.country=weatherData.sys.country;
    res.render('index',{sendData:sendData});
    


})


app.listen(4000,() => {
    console.log("4000");
});