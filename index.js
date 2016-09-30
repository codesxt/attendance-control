var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var staticRouter = require('./routes/static-router');
var apiRouter = require('./routes/api-router');
app.use(bodyParser.json());
app.use('/', staticRouter);
app.use('/api', apiRouter);
var server = app.listen(process.env.PORT || 5000, function(){
	console.log('Server listening on', process.env.PORT || 5000);
});
require('./websockets').connect(server);
