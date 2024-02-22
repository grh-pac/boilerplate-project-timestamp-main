// index.js
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  var dateParam = req.params.date;
  
  if (!dateParam) {
    // Handle empty date parameter
    var currentTime = new Date();
    res.json({ unix: currentTime.getTime(), utc: currentTime.toUTCString() });
    return;
  }

  var date;
  if (/^\d+$/.test(dateParam)) {
    // If the date parameter is a number, treat it as a Unix timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, try parsing it as a date string
    date = new Date(dateParam);
  }

  if (!isNaN(date.getTime())) {
    // Valid date
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  } else {
    // Invalid date
    res.json({ error: "Invalid Date" });
  }
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
