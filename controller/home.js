module.exports = function (request, response, controllerName) {

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host : '127.0.0.1',
		user : 'root',
		password : '123456',
		database : 'time_thief'
	});

	connection.connect(function(err) {
		if(err) {
			console.log(JSON.stringify(err));
			console.log("資料庫連結錯誤_home");
			return;
		}
		// connection.on('error', function() {
		// 	connection.end();
		// });
	});

    this.request  = request;
    this.response = response;
	this.viewPath = controllerName + "/";
	

	this.index = function(){
		this.response.render(this.viewPath + "index.html",
		{ userName:request.session.user, Msg: request.session.errMsg});
	}
    
	this.game = function () {
		let respon = this.response;
		if (!request.session.user) {
			respon.redirect("/");
			return;
		}
		this.response.render(this.viewPath + "game.html");
	}

	this.signout = function () {
		request.session.user = null;
		this.response.redirect("/");
	}
	
	this.intro = function(){
		this.response.render(this.viewPath + "intro.html",{userName:request.session.user});
	}
	this.news = function(){
		this.response.render(this.viewPath + "news.html",{userName:request.session.user});
	}

	this.changePort = function(){
		this.response.redirect("localhost:7777");
	}

	this.firebase =function(){
		this.response.render("testarea" + "/" + "index.html")
	}


	this.get_Hsk = function () {
		var objResponse = this.response;
		let user = request.session.user;
		connection.query('select lv, stage, sk_A, sk_B, coin, diamond from myself where uid = ?', [user], function(err, rows){
			if(err){
				console.log(JSON.stringify(err));
				return;
			}
			console.log(JSON.stringify(rows))
			objResponse.send(JSON.stringify(rows));
		})
		connection.end();
	
	}

	this.get_Csk = function () {
		var objResponse = this.response;
		let user = request.session.user;
		connection.query('select yellow, purple, blue from creatureskill where uid = ?', [user], function(err, rows){
			if(err){
				console.log(JSON.stringify(err));
				return;
			}
			objResponse.send(JSON.stringify(rows));
		})
		connection.end();
	}

	this.get_sign = function () {
		this.response.render(this.viewPath + "index.html");
	}
	
}	






