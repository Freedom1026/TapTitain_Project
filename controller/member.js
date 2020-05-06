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
			console.log("關閉連線_member");
            connection.end();
		}
		if(err) {
			console.log(JSON.stringify(err));
			console.log("資料庫連結錯誤_member");
			return;
        }
	});


    this.request  = request;
    this.response = response;
	this.viewPath = controllerName + "/";
	var tempUser;
	
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
							tempUser = request.session.user;
							response.redirect('http://localhost:7777/home');
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
		let city = request.body.city || '臺北市';
		let area = request.body.area || '中正區';
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
		let diamond = request.body.diamond;
		//
		let yellow = request.body.yellow;
		// console.log(yellow);
		let purple = request.body.purple;
		let blue = request.body.blue;
		let uid = request.session.user;
		connection.query('update myself set lv = ?, stage = ?, coin = ?, sk_A = ?, sk_B = ?, diamond = ? where uid = ?',[lv, stage, coin, sk_A, sk_B, diamond, uid]);
		connection.query('update creatureskill set yellow = ?, purple = ?, blue = ? where uid = ?',[yellow, purple, blue, uid]);
	}


	this.shop = function(){
		// console.log(request.session.user);
		this.response.render(this.viewPath + "shop.html", 
		{ userName: request.session.user });
	}

	this.cart = function(){
		this.response.render(this.viewPath + "cart.html");
	}
	
	this.profile = function(){
		this.response.render(this.viewPath + "mydata.html",{ userName: request.session.user });
	}

	this.get_cart = function(){
		var objResponse = this.response;
		let user = request.session.user;
		connection.query('call dataM(?)', [user], function(err, rows){
			if(err){
				console.log(JSON.stringify(err));
				return;
			}
			objResponse.send(JSON.stringify(rows));
		})
	}

	this.post_cart = function(){
		let user = request.session.user;
		let index = request.body.index;
		let receiver = request.body.receiver;
		let pname = request.body.pname;
		let pprice = request.body.pprice;
		let pamount = request.body.pamount;
		let psum = request.body.psum;
		let phone = request.body.phone;
		let mobile = request.body.mobile;
		let pay = request.body.payway;
		let objResponse = this.response;
		
		if(pay == "超商"){
			var method_transfer = request.body.brands;
			var convenience = request.body.convenience;
			var state = "待出貨";
			var fee;
			if(index == 0){
				fee = 45;
			}
			else{
				fee = 0;
			}

			connection.query('CALL `orderF`(?, ?, ?, ?, ?, ?, ?);',
			 [user, pname, pprice, pamount, index, fee, state], function(err, rows){
				if(err){
					console.log(JSON.stringify(err));
					return;
				}
				var getoid = JSON.stringify(rows[0]);
				getoid = JSON.parse(getoid);
				getoid = getoid[0]["LAST_INSERT_ID()"];
				console.log(getoid);

				connection.query('CALL `cstoreF`(?, ?, ?, ?, ?, ?, ?, ?);',
				[user, getoid, index, method_transfer, convenience, receiver, phone, mobile], function(err, rows){
				   if(err){
					   console.log(JSON.stringify(err));
					   return;
				   }
				   objResponse.redirect('/private/success');
			   })

			});
			
			}
		else if(pay == "ATM"){
			var method_transfer = "宅配"
			var atmsend = request.body.atmsend;
			var state = "待付款";
			var fee;
			if(index == 0){
				fee = 200;
			}
			else{
				fee = 0;
			}
			
			connection.query('CALL `orderF`(?, ?, ?, ?, ?, ?, ?);',
			 [user, pname, pprice, pamount, index, fee, state], function(err, rows){
				if(err){
					console.log(JSON.stringify(err));
					return;
				}
				var getoid = JSON.stringify(rows[0]);
				getoid = JSON.parse(getoid);
				getoid = getoid[0]["LAST_INSERT_ID()"];
				console.log(getoid);

				connection.query('CALL `atmF`(?, ?, ?, ?, ?, ?, ?, ?, ?);',
				[user, getoid, index, psum, method_transfer, atmsend, receiver, phone, mobile], function(err, rows){
				   if(err){
					   console.log(JSON.stringify(err));
					   return;
				   }
				   objResponse.redirect('/private/success');
			   })

			});			
		}

		// console.log(index,receiver,pname,pprice,pamount,psum,phone,mobile,method_transfer,atmsend,convenience,state)

		// 導向
		
	}

}	






