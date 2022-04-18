// API KEY: 6cf21166b847ff95a0bfa179e941a9d2-us14
// audience id: b04c0faaf7
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is up & running on port 3000.");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;
  console.log(firstname);
  console.log(lastname);
  console.log(email);
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/b04c0faaf7";
  const options = {
    method: "POST",
    auth: "deepansh1:6cf21166b847ff95a0bfa179e941a9d2-us14",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});
