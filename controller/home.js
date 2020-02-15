module.exports = function (request, response, controllerName) {
    this.request  = request;
    this.response = response;
    this.viewPath = controllerName + "/";
    
	this.index = function () {
	    this.response.render(this.viewPath + "index.html", 
	        { MeLv: 1 }
	    );
	}
	
}
