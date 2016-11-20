
var mongoose = require("mongoose");

// 连接数据库
mongoose.connect("mongodb://localhost/web80weibo",function(error){
	if (!error) {
		console.log("连接成功");
	}
})

// 集合的结构
var UserSchema = mongoose.Schema({
	username:String,
	password:String,
})

var User = mongoose.model("User",UserSchema);


module.exports = User;


