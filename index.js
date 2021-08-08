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
//     hostname: "https://api.tfl.gov.uk/Line/victoria/Status?app_id=14e37b0c2c9c479095152adea2cf5861&app_key=3c82b7114f7242c09111fa869c84c651",
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

https.get(url, function(err, response){
        console.log = ("this is the res "+response);
        console.log = (err);
        // response.on("data", function(data){
        //     const tflData = JSON.parse(data);
        //     console.log(tflData);
        // });     
        res.redirect("/");
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

