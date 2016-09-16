var express = require('express');
var app = express();

app.get('/api/hello-world', function (req, res) {
  res.send({message: 'Hello World!'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});