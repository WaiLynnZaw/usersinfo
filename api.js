var express = require("express");
var mongojs = require("mongojs");
var router = express.Router();

// var db = mongojs('mydb',['users']);
var db = mongojs('mongodb://wlz:root@ds019038.mlab.com:19038/myusersdb',['users']);

router.get("/users", function(req,res) {
	db.users.find(function(err,users){
		res.status(200).json(users);
	});
});

router.post("/users", function(req,res) {
	db.users.insert(req.body, function(err,result){
		res.status(200).send(result._id);
	});
});

router.get("/users/:id", function(req,res){
	var id = req.params.id;
	db.users.find({ _id: mongojs.ObjectId(id)}, function(err,user){
		if(user) res.status(200).json(user);
		else res.sendStatus(404);
	});
});

router.put("/users/:id", function(req, res) {
	var id = db.ObjectId(req.params.id);
	var data = req.body;
	data._id = id;

	db.users.save(data, function(err, result){
		res.status(200).json({"message":"Successfully Updated"});
	});
});

router.delete("/users/:id", function(req, res) {
	var id = db.ObjectId(req.params.id);
	db.users.remove({ _id: id}, function(err, result) {
		res.status(200).json({"message":"Successfully Deleted"});
	});
});

module.exports = router;