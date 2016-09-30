var mongoose = require('mongoose');
var Attendant = require('../models/attendant');
var websockets = require('../websockets.js');

module.exports.register = function(req, res){
  var newAttendant = new Attendant();
  newAttendant.name = req.body.name;
  newAttendant.email = req.body.email;
  newAttendant.save(function(err){
    if(err){
      console.log(err);
    }
    res.status(200);
    res.json(newAttendant);
    websockets.broadcast('inserted', newAttendant);
  });
};

module.exports.list = function(req, res){
  Attendant
  .find()
  .exec(function(err, attendants){
    res
    .status(200)
    .json(attendants);
  });
};

module.exports.remove = function(req, res){
  Attendant
  .remove({
    _id: req.params.id
  })
  .exec(function(err){
    if(err){
      res
      .status(200)
      .json("Error. Usuario no encontrado.");
    }
    console.log("Deleted: " + req.params.id);
    websockets.broadcast('removed', req.params.id);
    res
    .status(200)
    .json({
      _id: req.params.id
    });
  });
};
