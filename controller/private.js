module.exports = function (request, response, controllerName) {

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: '127.0.0.1',
		user: 'root',
		password: '123456',
		database: 'time_thief'
	});

	connection.connect(function (err) {

		if (err) {
			console.log(JSON.stringify(err));
			console.log("資料庫連結錯誤_private");
			return;
		}
		// connection.on('error', function() {
		// 	connection.end();
		// });
	});


	this.request = request;
	this.response = response;
	this.viewPath = controllerName + "/";



	this.personal = function () {
		this.response.render(this.viewPath + "personal.html",{ userName: request.session.user });
	}

	this.password = function () {
		this.response.render(this.viewPath + "password.html",{ userName: request.session.user });
	}

	this.inform = function () {
		this.response.render(this.viewPath + "inform.html",{ userName: request.session.user });
	}

	this.order = function () {
		this.response.render(this.viewPath + "order.html",{ userName: request.session.user });
	}
	this.success = function () {
		this.response.render(this.viewPath + "success.html",{ userName: request.session.user });
	}
	this.failed = function () {
		this.response.render(this.viewPath + "failed.html",{ userName: request.session.user });
	}

	this.get_order = function () {
		var objResponse = this.response;
		let user = request.session.user;
		//訂購日期 iid  pname pprice p_n fee state
		connection.query('SELECT `purchase_date`,`item_id`,`product_name`,`product_price`,`product_n`,`fee`,`state` FROM `order_list` WHERE uid = ?', [user], function (err, result) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			let data = JSON.stringify(result);
			objResponse.send(data);
		})
		connection.end();
	}

	this.diamond = function () {
		this.response.render(this.viewPath + "diamond.html",{ userName: request.session.user });
	}

	this.get_history = function () {
		var objResponse = this.response;
		let user = request.session.user;
		connection.query('SELECT `modified_date`,`amount`,`diamond_card`,`the_rest` FROM diamond WHERE uid = ?',
			[user], function (err, result) {
				if (err) {
					console.log(JSON.stringify(err));
					return;
				}
				let data = JSON.stringify(result);
				objResponse.send(data);
			});
			connection.end();
	}

	this.post_diamond = function () {
		var objResponse = this.response;
		let card = request.body.id;
		let pas = request.body.ps;
		let acc = request.body.ac;
		console.log(card, pas, acc);
		connection.query('call validTB(?, ?)', [card, pas], function (err, result) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			let getND = JSON.stringify(result[0]);
			getND = JSON.parse(getND);
			var getValid = getND[0].n;
			var getCard = getND[0].diamond_card;
			if (getValid == 1) {
				connection.query('SELECT COUNT(*) as n FROM `member_list` WHERE account = ? ', [acc], function (err, result) {
					if (err) {
						console.log(JSON.stringify(err));
						return;
					}
					getND = JSON.stringify(result[0]);
					getND = JSON.parse(getND);
					console.log(getND);
						if (getND.n == 1) {
							connection.query('call deposit(?, ?)', [acc, getCard], function (err) {
								if (err) {
									console.log(JSON.stringify(err));
									return;
								}
							});
							console.log("here");
							connection.end();
							objResponse.redirect('/private/success');
						}
						else {
							//帳號不存在
							connection.end();
							objResponse.redirect('/private/failed');
						}
				})
			}
			else {
				//卡號無效
				connection.end();
				objResponse.redirect('/private/failed');
			}
			// this.response.redirect('/private/failed');
		})

	}

	this.history = function () {
		this.response.render(this.viewPath + "history.html",{ userName: request.session.user });
	}

	this.post_update = function () {
		let email = request.body.staticEmail;
		let country = request.body.city;
		let area = request.body.area;
		let detail = request.body.detail;
		let user = request.session.user;
		let name = request.body.myname;
		let phone = request.body.phone;
		let mobile = request.body.mobile;
		connection.query('UPDATE address set country = ?, area = ?, detail = ? WHERE uid = ?',
			[country, area, detail, user], function (err, result) {
				if (err) {
					console.log(JSON.stringify(err));
					return;
				}
			});
		connection.query('UPDATE contact set name = ?, phone = ?, mobile = ? WHERE account = ?',
			[name, phone, mobile, email], function (err, result) {
				if (err) {
					console.log(JSON.stringify(err));
					return;
				}
			})
			connection.end();
		this.response.redirect('/private/success');
	}

	this.login = function(){
		this.response.render(this.viewPath + "login.html",
		{ userName:request.session.user, Msg: request.session.errMsg});
	}

	this.post_login = function(){
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
							connection.end();
							response.redirect('/member/profile');
						})

				}
				else{
					console.log("登入失敗");
					request.session.errMsg = "帳號密碼錯誤";
					connection.end();
					response.redirect('/member/profile');
				}

		});
	}


	
	this.user = function () {
		var objResponse = this.response;
		let user = request.session.user;
		connection.query('call dataM(?)', [user], function (err, result) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			let data = JSON.stringify(result[0]);
			objResponse.send(data);
		})
	}

	this.update_pas = function () {
		let acc = request.session.user;
		let pass = request.body.oldpass;
		let newpass = request.body.newpass;
		let nopass = request.body.nopass;
		var correct;
		(newpass == nopass) ? correct = 1 : correct = 0;
		console.log(acc + "登入");
		let response = this.response;
		connection.query('SELECT COUNT(*) as n, member_id.account FROM member_list, member_id WHERE member_list.account = member_id.account AND member_id.uid = ? AND pass = md5(?)',
			[acc, pass], function (err, output) {
				if (err) {
					console.log(JSON.stringify(err));
					return;
				}
				let result = JSON.stringify(output);
				result = JSON.parse(result);
				let acot = result[0].account;
				if (result[0].n == 1 && correct == 1) {
					connection.query('UPDATE member_list set pass = md5(?) where account = ?',
						[newpass, acot], function (err, output) {
							if (err) {
								console.log(JSON.stringify(err));
								return;
							}
							connection.end();
							response.redirect('/member/profile')
						}
					)

				}
				else {
					connection.end();
					response.redirect('/private/failed')
				}

			})

	}





}
