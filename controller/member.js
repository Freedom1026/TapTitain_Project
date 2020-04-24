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
			console.log("資料庫連結錯誤_member");
			return;
		}
	});


    this.request  = request;
    this.response = response;
	this.viewPath = controllerName + "/";
	
	this.post_signAJAX = function () {
		var objResponse = this.response;
		let acc = this.request.body.acc;
		connection.query('SELECT COUNT(*) as n FROM `member_list` WHERE account = ?', [acc], function(err, result){
			if(err){
				console.log(JSON.stringify(err));
				return;
			}
			let useORnot =JSON.stringify(result);
			objResponse.send(useORnot);
		})
	}
	
	this.post_sign = function () {
		let acc = request.body.account;
		let pass = request.body.password;
		console.log(acc + "登入");
		let response = this.response;
		connection.query('SELECT COUNT(*) as n FROM `member_list` WHERE account = ? AND pass = md5(?)',[acc, pass], function(err, output){
			if(err){
				console.log(JSON.stringify(err));
				return;
			}
			let result = JSON.stringify(output);
			result = JSON.parse(result);

			if(result[0].n == 1){
					console.log("登入成功");
					request.session.errMsg = "";
						connection.query('SELECT uid FROM member_id WHERE account = ?', [acc], function(err, row){
							if(err){
								console.log(JSON.stringify(err));
								return;
							}
							let sessionUser = JSON.stringify(row);
							sessionUser = JSON.parse(sessionUser);
							request.session.user = sessionUser[0].uid;
							response.redirect('/home');
						})

				}
				else{
					console.log("登入失敗");
					request.session.errMsg = "帳號密碼錯誤";
					response.redirect('/');
				}

		});
	}

	this.post_register = function(){
		let myname = request.body.myname;
		let gender = request.body.gender;
		let mail = request.body.mail;
		let password = request.body.password;
		let birthday= request.body.birthday;
		birthday = new Date(birthday);
		birthday = birthday.getTime()/1000;
		let phone = request.body.phone;
		let mobile = request.body.mobile;
		let city = request.body.city | '臺北市';
		let area = request.body.area | '中正區';
		let detail = request.body.detail;
		connection.query('call register( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )', [mail, password, birthday, city, area, detail, myname, gender, phone, mobile], function(err, rows){
			if(err){
				console.log(JSON.stringify(err));
				return;
			}
		})

		this.response.redirect('/');
	}

	this.put_record = function(){
		//
		let lv = request.body.lv;
        let stage = request.body.stage;
        let coin =request.body.coin;
        let sk_A = request.body.sk_A;
		let sk_B = request.body.sk_B;

		//
		let yellow = request.body.yellow;
		// console.log(yellow);
		let purple = request.body.purple;
		let blue = request.body.blue;
		let uid = request.session.user;
		connection.query('update myself set lv = ?, stage = ?, coin = ?, sk_A = ?, sk_B = ? where uid = ?',[lv, stage, coin, sk_A, sk_B, uid]);
		connection.query('update creatureskill set yellow = ?, purple = ?, blue = ? where uid = ?',[yellow, purple, blue, uid]);
	}



	this.shop = function(){
		this.response.render(this.viewPath + "shop.html");
	}

	this.cart = function(){
		this.response.render(this.viewPath + "cart.html");
	}
	
	this.profile = function(){
		this.response.render(this.viewPath + "mydata.html");
	}

}	






