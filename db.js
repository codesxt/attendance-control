var mongoose = require('mongoose');
//mongoose.set('debug', true);
mongoose.Promise = global.Promise;
var dbpath = process.env.MONGODB_URI || 'mongodb://localhost/attendance';
mongoose.connect(dbpath, function(){
	console.log('MongoDB connected.');
});
module.exports = mongoose;
