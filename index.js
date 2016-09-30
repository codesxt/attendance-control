var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var staticRouter = require('./routes/static-router');
var apiRouter = require('./routes/api-router');
app.use(bodyParser.json());
app.use('/', staticRouter);
app.use('/api', apiRouter);
var server = app.listen(3000, function(){
	console.log('Server listening on', 3000);
});
require('./websockets').connect(server);
