const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const ejs = require("ejs");

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

const tube = ["piccadilly","victoria","circle","norther"];

// const options = {
//     hostname: "https://api.tfl.gov.uk/Line/victoria/Status?app_id="+process.env.PRIMARY_KEY+"&app_key="+process.env.SECONDARY_KEY,
//     method: "GET",
//     headers:{
//         "Content-Type": "application/json"
//     }
// };


app.get("/", function(req,res){
    res.render("index.ejs");
});

app.get("/status", function(req,res){

 const url="https://api.tfl.gov.uk/Line/victoria/Status?app_id="+process.env.PRIMARY_KEY+"&app_key="+process.env.SECONDARY_KEY;

https.get(url, function(response){
        console.log (response);
        console.log("-------------------------------");
        console.log(response.statusCode);
        console.log("-------------------------------");
        console.log(response.headers);
        console.log("-------------------------------");
        let responseBody = "";
        let parsedBody = "";
        let tubeStatus = ""
        response.setEncoding("utf-8");
        response.on("data", function(chunk){    //getting all chunks of data
            responseBody += chunk;
            // responseBody += JSON.parse(JSON.stringify(chunk));
            // console.log("this is the body response"+responseBody);
            // console.log("-------------------------------");
            // console.log("this is the body response lenght"+responseBody.length);
            // console.log("this is the body position 0 "+responseBody[0]);
            // console.log("this is the body position 1 "+responseBody[1]);



            // for (i=0;i<responseBody.length;i++){
            //     let object = JSON.parse(responseBody[i]);
            //     parsedBody.push(object);
            // };

            // console.log(parsedBody);
            // const parsedBody = JSON.parse(responseBody);
            // console.log(parsedBody);
        });  

        response.on ("end", function(){   //parsing when all data are received
            parsedBody = JSON.parse(responseBody);
            console.log(parsedBody); 
            console.log("-------------------------------");
            console.log(parsedBody[0].lineStatuses[0].statusSeverityDescription);
            tubeStatus = parsedBody[0].lineStatuses[0].statusSeverityDescription;
            console.log (tubeStatus);
        })   
        res.render("index", {"victoriaStatus":tubeStatus});
});


// for (i=0;i<tube.length;i++){
//  let url = "https://api.tfl.gov.uk/Line/"+tube[i]+"/Status?primary_key="+process.env.PRIMARY_KEYc+"&scondary_key="+process.env.SECONDARY_KEY  
//  https.request(url, function (err,response){
//      if (err) {
//          console.log (err);
//      } else {
//         console.log(response);
//      }
    
//  })
// }

});



app.listen(3000, function(){
    console.log ("server is listening on port 3000");
});

