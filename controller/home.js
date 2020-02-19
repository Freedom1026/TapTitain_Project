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
	

    
	this.index = function () {
		this.response.render(this.viewPath + "index.html", 
			{ MeLv: 1}
		);
	}
	

	this.test = function(){
		this.response.render(this.viewPath + "test.html");
	}


	this.get_test = function () {
		var objResponse = this.response;
		connection.query('select heroLv, heroSkLv_A, heroSkLv_B, coin from myself where id = ?', ['1'], function(err, rows){
			if(err){
				console.log(JSON.stringify(err));
				return;
			}
			objResponse.send(JSON.stringify(rows));
		})
	}
}	




