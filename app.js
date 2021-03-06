// 以 Express 建立 Web伺服器
var PORT = process.env.PORT || 80;
var express = require("express");
var app = express();

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//socket
var http = require('http');
var server = http.Server(app);
server.listen(PORT, function () {
    console.log('Chat server running');
});
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('message', function (msg) {
        io.emit('message', msg);
    });
});
// Web伺服器的靜態檔案置於 public 資料夾
app.use(express.static("public"));

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: true,
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
// app.listen(80);
console.log("Server is running... Press 'Ctrl + C' to exit.");


// 路由設定:
// 格式:  /controllerName/actionName

app.get("/", function (request, response) {
    doControllerAction("home", "index", request, response);
});

app.get("/:controllerName", function (request, response) {
    var controllerName = request.params.controllerName;
    doControllerAction(controllerName, "game", request, response);
});

app.get("/:controllerName/:actionName", function (request, response) {
    var controllerName = request.params.controllerName;
    var actionName = request.params.actionName;
    doControllerAction(controllerName, actionName, request, response);
});

app.post("/:controllerName/:actionName", function (request, response) {
    var controllerName = request.params.controllerName;
    var actionName = request.params.actionName;
    doControllerAction(controllerName, actionName, request, response);
});

app.put("/:controllerName/:actionName", function (request, response) {
    var controllerName = request.params.controllerName;
    var actionName = "put_" + request.params.actionName;
    doControllerAction(controllerName, actionName, request, response);
});

// 呼叫 controller.action() 以處理 Client 端送來的請求
function doControllerAction(controllerName, actionName, request, response) {
    if(controllerName == "img"){
        console.log(request);
    }
    if (controllerName !== "js") {
        let moduleName = "./controller/" + controllerName + ".js";
        let controllerClass = require(moduleName);
        let controller = new controllerClass(request, response, controllerName);
        controller[actionName]();
    }

}
