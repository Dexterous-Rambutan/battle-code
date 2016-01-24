var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

require('routes.js')(app, express);

app.listen(port);
console.log('Server now listening on port ' + port);
