//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
   const fName = req.body.fName;
   const lName = req.body.lName;
   const email = req.body.email;
   const data = {
     members: [
       {
         email_address: email,
         status: "subscribed",
         merge_fields: {
           FNAME: fName,
           LNAME: lName
         }
       }
     ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us6.api.mailchimp.com/3.0/lists/23404e720f";

   const options = {
     method: "POST",
     auth: "anmol065:b3f92e75073961dba4ef27c5e8ec27b0-us6"
   };

   const request = https.request(url, options, function(response) {
     response.on("data", function(data) {
       console.log(JSON.parse(data));
       if(response.statusCode === 200) {
         res.sendFile(__dirname + "/success.html");
         console.log(response.statusCode);
       } else {
         res.sendFile(__dirname + "/failure.html");
         console.log(response.statusCode);
       }
     });
   });

   request.write(jsonData);
   request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});

//API key
//b3f92e75073961dba4ef27c5e8ec27b0-us6

//unique id or audience id
//23404e720f
