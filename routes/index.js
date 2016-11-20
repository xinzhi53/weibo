var express = require('express');
var router = express.Router();

var User = require("../model/user.js");
var Message = require("../model/message.js");
//  首页
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  Message.find(function(error,docs){
  	if (error) {
  		console.log("查找错误");
  		docs = [];
  	}
  	res.render('index', { messages:docs ,status : "home"});
  })




});

// 注册页面
router.get('/reg', function(req, res, next) {
  res.render('reg', { title: '注册页面' ,status : "reg" });
});

// 注册操作
router.post('/reg', function(req, res, next) {
  // res.render('index', { title: '注册操作' });
  console.log(req.body.username);
  // console.log("wwwwww" + req.body.password-repeat);

  User.findOne({username:req.body.username},function(error,docs){
  	if (docs) {
  		// console.log("用户名已存在");
  		error = "用户名已存在";
  		// return;
  	}

  	if (req.body.password != req.body["password-repeat"]) {
  		// console.log("两次密码不一致");
  		// return;
  		error = "两次密码不一致";
  	}
// 查询时出现错误
  	if (error) {
  		// res.locals.error = "XXXXXXX";
  		req.session.error = error;
  		// console.log(error);
  		return res.redirect("/reg");
  	}

  	var user = new User({
  		username:req.body.username,
  		password : req.body.password ,
  	});

  	user.save(function(error){
  		if (!error) {
  			console.log("注册成功");
	  		return res.redirect("/");
  		}
  	})
  })




});

// 登录页面
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录页面' ,status : "login" });
});

// 登录操作
router.post('/login', function(req, res, next) {
  // res.render('login', { title: '登录操作' });
  // 判断用户名是否存在
User.findOne({username:req.body.username},function(error,docs){
	if (!docs) {
		error = "用户名不存在";
	}
	// 匹配密码
	if (req.body.password != docs.password) {
		error = "密码错误";
	}
	//出现错误
	if (error) {
		req.session.error = error;
		return res.redirect("/login");
	}

	req.session.success = "登录成功";
	req.session.user = docs;
	res.redirect("/");

})

});

//   发消息路由设置
router.post('/postmsg',function(req, res, next){
	var msg = new Message({
		username : req.session.user.username,
		content : req.body.content,
		sendTime : new Date()
	})

	msg.save(function(error){
		if (!error) {
			console.log("发送成功");
			res.redirect("/");
		}
	})
})



module.exports = router;
