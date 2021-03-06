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
    
    this.manage = function(){
        this.response.render(this.viewPath + "manage.html");
    }
	
}