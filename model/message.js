
var mongoose = require("mongoose");

// 集合的结构
var MessageSchema = mongoose.Schema({
	username:String,
	content:String,
	sendTime:Date
})

var Message = mongoose.model("Message",MessageSchema);


module.exports = Message;