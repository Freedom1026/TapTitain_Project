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
	

	this.post_sign = function () {
		//首字母以小寫開頭
		let patt = /^[a-z]/;
		//接受 數字、字母、底線
		let patt2 = /[/w]/;
		let acc = this.request.body.acc;
		this.response.render(this.viewPath + "signup.html");
	}
	
}	






