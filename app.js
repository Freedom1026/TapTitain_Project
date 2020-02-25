// 以 Express 建立 Web伺服器
var express = require("express");
var app = express();

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

// Web伺服器的靜態檔案置於 public 資料夾
app.use( express.static( "public" ) );

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

//回絕icon要求 ----->之後再說
app.get('/favicon.ico', (req, res) => res.status(204));

// 指定 esj 為 Express 的畫面處理引擎
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/view');

// 一切就緒，開始接受用戶端連線
// app.listen(process.env.PORT);
app.listen(80);
console.log("Server is running... Press 'Ctrl + C' to exit.");


// 路由設定:
// 格式:  /controllerName/actionName
app.get("/", function (request, response) {
    doControllerAction("home", "index", request, response);
});

app.get("/:controllerName", function (request, response) {
    var controllerName = request.params.controllerName;
    doControllerAction(controllerName, "test", request, response);
});

app.get("/:controllerName/:actionName", function (request, response) {
    var controllerName = request.params.controllerName;
    var actionName = request.params.actionName;
    doControllerAction(controllerName, actionName, request, response);
});



// 呼叫 controller.action() 以處理 Client 端送來的請求
function doControllerAction(controllerName, actionName, request, response) {
    var moduleName = "./controller/" + controllerName + ".js";
    var controllerClass = require(moduleName);
    var controller = new controllerClass(request, response, controllerName);
    controller[actionName]();    
}
