var express = require("express");
var parser = require("body-parser");
var api = require("./api.js");
var app = express();

app.use(parser.urlencoded({extended:true}));

app.use("/api",api);

var server = app.listen(3000,function(){
	console.log("running on port 3000");
});