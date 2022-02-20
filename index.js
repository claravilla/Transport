const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const ejs = require("ejs");
const axios = require('axios');

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

const tube = ["piccadilly","victoria","circle","northern"];
let tubeStatus = [];

let url = "";
let responseBody = "";
let parsedBody = "";
let piccadillyTubeStatus = "";
let victoriaTubeStatus = "";
let circleTubeStatus = "";
let northernTubeStatus = "";



app.get("/", function(req,res){

url="https://api.tfl.gov.uk/Line/"+tube[0]+"/Status?app_id="+process.env.PRIMARY_KEY+"&app_key="+process.env.SECONDARY_KEY;
  axios.get(url)
  .then ((data)=>{
      tubeStatus.push(data.data[0].lineStatuses[0].statusSeverityDescription);
      switch (tubeStatus[0]) {
                       case "Good Service":
                           piccadillyTubeStatus = "green";
                           break;
                        case "Minor Delays":
                            piccadillyTubeStatus = "orange";
                            break;
                        case "Severe Delays":
                            piccadillyTubeStatus = "red";
                            break;
                        default: 
                        piccadillyTubeStatus = "grey";
                    };
      url = "https://api.tfl.gov.uk/Line/"+tube[1]+"/Status?app_id="+process.env.PRIMARY_KEY+"&app_key="+process.env.SECONDARY_KEY;
      return axios.get(url);
  })
  .then((data)=>{
    tubeStatus.push(data.data[0].lineStatuses[0].statusSeverityDescription);
      switch (tubeStatus[1]) {
                       case "Good Service":
                           victoriaTubeStatus = "green";
                           break;
                        case "Minor Delays":
                            victoriaTubeStatus = "orange";
                            break;
                        case "Severe Delays":
                            victoriaTubeStatus = "red";
                            break;
                        default: 
                        victoriaTubeStatus = "grey";
                    };
    url = "https://api.tfl.gov.uk/Line/"+tube[2]+"/Status?app_id="+process.env.PRIMARY_KEY+"&app_key="+process.env.SECONDARY_KEY;
    return axios.get(url);
})
.then((data)=>{
    tubeStatus.push(data.data[0].lineStatuses[0].statusSeverityDescription);
    switch (tubeStatus[2]) {
                     case "Good Service":
                         circleTubeStatus = "green";
                         break;
                      case "Minor Delays":
                          circleTubeStatus = "orange";
                          break;
                      case "Severe Delays":
                          circleTubeStatus = "red";
                          break;
                      default: 
                      circleTubeStatus = "grey";
                  };
    url = "https://api.tfl.gov.uk/Line/"+tube[3]+"/Status?app_id="+process.env.PRIMARY_KEY+"&app_key="+process.env.SECONDARY_KEY;
    return axios.get(url);
})
.then((data)=>{
    tubeStatus.push(data.data[0].lineStatuses[0].statusSeverityDescription);
    switch (tubeStatus[3]) {
                     case "Good Service":
                         northernTubeStatus = "green";
                         break;
                      case "Minor Delays":
                          northernTubeStatus = "orange";
                          break;
                      case "Severe Delays":
                          northernTubeStatus = "red";
                          break;
                      default: 
                      northernTubeStatus = "grey";
                  };

    console.log (`piccadilly: ${piccadillyTubeStatus} victoria: ${victoriaTubeStatus} circle: ${circleTubeStatus} northern ${northernTubeStatus}`);

    res.render("index", {"piccadillyStatus": tubeStatus[0], "piccadillyClass":piccadillyTubeStatus, "victoriaStatus": tubeStatus[1], "victoriaClass":victoriaTubeStatus,
    "circleStatus": tubeStatus[2], "circleClass":circleTubeStatus, "northernStatus": tubeStatus[3], "northernClass":northernTubeStatus})
})
  .catch((error)=> {console.log(error)});

});





app.listen(3000, function(){
    console.log ("server is listening on port 3000");
});

