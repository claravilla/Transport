const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const ejs = require("ejs");

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
let northerTubeStatus = "";


// for loop and use te i position in the array tube in url, tubeStatus variable i.e url +tube[i]+ and then tube[i]+TubeStatus
// so all 4 var should be updated and then you can res.render with the 4 status


app.get("/", function(req,res){
    res.render("index", {"piccadillyStatus":123, "piccadillyClass":"green"});
});

app.get("/status", function(req,res){

    // for (i=0;i<tube.length;i++){
    //     console.log(i);
    //     console.log(tube[i]);

url="https://api.tfl.gov.uk/Line/"+tube[0]+"/Status?app_id="+process.env.PRIMARY_KEY+"&app_key="+process.env.SECONDARY_KEY;


https.get(url, function(response){
        // console.log (response);
        // console.log("-------------------------------");
        // console.log(response.statusCode);
        // console.log("-------------------------------");
        // console.log(response.headers);
        // console.log("-------------------------------");
        
        response.setEncoding("utf-8");
        response.on("data", function(chunk){    //getting all chunks of data
            responseBody += chunk;
        });  

        response.on ("end", function(){   //parsing when all data is received
            parsedBody = JSON.parse(responseBody);
            console.log(parsedBody); 
            console.log("-------------------------------");
            tubeStatus[0] = parsedBody[0].lineStatuses[0].statusSeverityDescription;           
            console.log("this is the status "+tubeStatus[0]+" of "+tube[0]);
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
                default: "green";
            };
            console.log(piccadillyTubeStatus);
            res.render("index", {"piccadillyStatus": tubeStatus[0], "piccadillyClass":piccadillyTubeStatus});
            
        });
 
    });

    
 // };  closing for loop  

//  res.render("index", {"piccadillyStatus": tubeStatus[0]});
});





app.listen(3000, function(){
    console.log ("server is listening on port 3000");
});

