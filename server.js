var express = require('express');
var app = express();

app.use(express.static('static'));

app.use(function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

var server = app.listen(3003, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);

});
