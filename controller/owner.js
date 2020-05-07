module.exports = function (request, response, controllerName) {

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host : '127.0.0.1',
		user : 'root',
		password : '',
		database : 'time_thief'
	});

	connection.connect(function(err) {
		if (err === 'PROTOCOL_CONNECTION_LOST') {
			// 直接關連線
			console.log("關閉連線_home");
            connection.end();
		} 
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