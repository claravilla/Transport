const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

const tube = ["piccadilly","victoria","circle","norther"];


app.get("/", function(req,res){
    res.sendFile(__dirname+"/public/index.html");
});

app.get("/status", function(req,res){
  let url = "https://api.tfl.gov.uk/Line/circle/Status?primary_key="+process.env.PRIMARY_KEY+"&secondary_key="+process.env.SECONDARY_KEY

https.request(url, function(err, response){
    if (err) {
        console.log (err);
    } else {
        console.log (response);
        res.redirect("/");
    };
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

