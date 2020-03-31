module.exports = function (request, response, controllerName) {

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host : '127.0.0.1',
		user : 'root',
		password : '',
		database : 'moontower'
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
	
	this.post_signAJAX = function () {
		 let acc = this.request.body.acc;
		connection.query('SELECT COUNT(*) FROM `acps` WHERE account = ?', ['acc'], function(err, result){
			if(err){
				console.log(JSON.stringify(err));
				return;
			}
			objResponse.send("錯誤是何時");
		})
	}
	
	this.post_sign = function () {
		let acc = this.request.body.acc;
		console.log(acc);
		this.response.render(this.viewPath + "signup.html");
	}
	
}	






