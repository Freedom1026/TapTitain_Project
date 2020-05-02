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
			console.log("關閉連線_private");
            connection.end();
		}
		if(err) {
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
	this.post_diamond = function(){
		var objResponse = this.response;
		let card = request.body.id;
		let pas = request.body.ps;
		let acc = request.body.ac;
		console.log(card, pas, acc);
		connection.query('call validTB(?, ?)', [card, pas], function(err, result){
			if(err){
				console.log(JSON.stringify(err));
				return;
			}
			let getND =JSON.stringify(result[0]);
			getND =JSON.parse(getND);
			var getValid =getND[0].n;
			var getCard =getND[0].diamond_card;
			if(getValid == 1){
				connection.query('SELECT COUNT(*) as n FROM `member_list` WHERE account = ? ',[acc],function(err,result){
					if(err){
						console.log(JSON.stringify(err));
						return;
					}
					getND = JSON.stringify(result[0]);
					getND = JSON.parse(getND);
					if(getND.n == 1){
						connection.query('call deposit(?, ?)',[acc, getCard],function(err){
							if(err){
								console.log(JSON.stringify(err));
								return;
							}
						});
						objResponse.send("儲值成功");
					}
					else{
						objResponse.send("儲值失敗，此帳號不存在");
					}
				})
			}
			else{
				
				objResponse.send("此卡號無效");
			}
			
		})
	}

	this.history = function(){
		this.response.render(this.viewPath + "history.html");
	}

	this.user = function(){
		var objResponse = this.response;
		let user = request.session.user;
		connection.query('call dataM(?)', [user], function(err, result){
			if(err){
				console.log(JSON.stringify(err));
				return;
			}
			let data =JSON.stringify(result[0]);
			objResponse.send(data);
		})
	}
}	






