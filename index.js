const express = require("express");
const dotenv = require("dotenv").config();
const ejs = require("ejs");
const axios = require('axios');

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const tubes = [
    {name: "piccadilly",
    status: "",
    class:""
    },
    {name: "victoria",
    status: "",
    class:""
    },
    {name: "circle",
    status: "",
    class:""
    },
    {name: "northern",
    status: "",
    class:""
    }
  ];

  let url = "";


function setClass(tubeIndex, tubeStatus) {
    switch (tubeStatus) {
        case "Good Service":
            tubes[tubeIndex].class = "green";
            break;
         case "Minor Delays":
            tubes[tubeIndex].class  = "orange";
             break;
         case "Severe Delays":
            tubes[tubeIndex].class  = "red";
             break;
         default: 
         tubes[tubeIndex].class  = "grey";
     };
}


app.get("/", function(req,res){

    url="https://api.tfl.gov.uk/Line/"+tubes[0].name+"/Status?app_id="+process.env.PRIMARY_KEY+"&app_key="+process.env.SECONDARY_KEY;
    axios.get(url)
    .then ((data)=>{
      tubes[0].status = data.data[0].lineStatuses[0].statusSeverityDescription;
      setClass(0,tubes[0].status);
        url = "https://api.tfl.gov.uk/Line/"+tubes[1].name+"/Status?app_id="+process.env.PRIMARY_KEY+"&app_key="+process.env.SECONDARY_KEY;
        return axios.get(url);
    })
    .then((data)=>{
      tubes[1].status = data.data[0].lineStatuses[0].statusSeverityDescription;
      setClass(1,tubes[1].status);
      url = "https://api.tfl.gov.uk/Line/"+tubes[2].name+"/Status?app_id="+process.env.PRIMARY_KEY+"&app_key="+process.env.SECONDARY_KEY;
      return axios.get(url);
  })
  .then((data)=>{
      tubes[2].status = data.data[0].lineStatuses[0].statusSeverityDescription;
      setClass(2,tubes[2].status);
      url = "https://api.tfl.gov.uk/Line/"+tubes[3].name+"/Status?app_id="+process.env.PRIMARY_KEY+"&app_key="+process.env.SECONDARY_KEY;
      return axios.get(url);
  })
  .then((data)=>{
      tubes[3].status = data.data[0].lineStatuses[0].statusSeverityDescription;
      setClass(3,tubes[3].status);
  
      res.render("index", {"piccadillyStatus": tubes[0].status, "piccadillyClass":tubes[0].class, "victoriaStatus": tubes[1].status, "victoriaClass":tubes[1].class,
      "circleStatus": tubes[2].status, "circleClass":tubes[2].class, "northernStatus": tubes[3].status, "northernClass":tubes[3].class})
  })
    .catch((error)=> {console.log(error)});

});



// res.render("index", {"piccadillyStatus": "loading", "piccadillyClass":"lightgrey", "victoriaStatus": "loading", "victoriaClass":"lightgrey",
// "circleStatus": "loading", "circleClass":"lightgrey", "northernStatus": "loading", "northernClass":"lightgrey"});


app.listen(3000, function(){
    console.log ("server is listening on port 3000");
});

