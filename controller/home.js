module.exports = function (request, response, controllerName) {

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host : '127.0.0.1',
		user : 'root',
		password : '',
		database : 'time_thief'
	});

	connection.connect(function(err) {
		// if (err) throw err;
		if (err) {
			console.log(JSON.stringify(err));
			console.log("資料庫連結錯誤");
			return;
		}
	});


    this.request  = request;
    this.response = response;
	this.viewPath = controllerName + "/";
	

	this.index = function(){
		this.response.render(this.viewPath + "index.html",{ Msg: request.session.errMsg});
	}
    
	this.game = function () {
		this.response.render(this.viewPath + "game.html");
	}
	this.signup = function () {
		this.response.render(this.viewPath + "signup.html");
		//this.response.send("testhello");
	}
	

	this.test = function(){
		this.response.render(this.viewPath + "test.html");
	}

	this.firebase =function(){
		this.response.render("testarea" + "/" + "firebase.html")
	}


	this.get_Hsk = function () {
		var objResponse = this.response;
		let user = request.session.user;
		connection.query('select lv, sk_A, sk_B, coin from myself where uid = ?', [user], function(err, rows){
			if(err){
				console.log(JSON.stringify(err));
				return;
			}
			objResponse.send(JSON.stringify(rows));
		})
	}

	this.get_Csk = function () {
		// var objResponse = this.response;
		// connection.query('select A, B, C from creatureskill where id = ?', ['1'], function(err, rows){
		// 	if(err){
		// 		console.log(JSON.stringify(err));
		// 		return;
		// 	}
		// 	objResponse.send(JSON.stringify(rows));
		// })
	}

	this.get_sign = function () {
		this.response.render(this.viewPath + "index.html");
	}
	
}	






