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
			console.log("資料庫連結錯誤_private");
			return;
		}
	});


    this.request  = request;
    this.response = response;
	this.viewPath = controllerName + "/";



	this.personal = function(){
		this.response.render(this.viewPath + "personal.html");
	}

	this.password = function(){
		this.response.render(this.viewPath + "password.html");
	}
	
	this.inform = function(){
		this.response.render(this.viewPath + "inform.html");
	}
	
	this.order = function(){
		this.response.render(this.viewPath + "order.html");
	}

	this.diamond = function(){
		this.response.render(this.viewPath + "diamond.html");
	}
	this.history = function(){
		this.response.render(this.viewPath + "history.html");
	}

}	






