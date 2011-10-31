//NodeJS Init Script 
//DO NOT EDIT. THIS IS SIMPLY THE SERVER
//Prototyping
String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};
//DONE
var globalsocket = null;
var app = require('http').createServer(handler), io = require('socket.io').listen(app), fs = require('fs')
app.listen(8765, "0.0.0.0");
function handler (req, res) {
	
	var file = null;
	var dir = "/static";
	if(req.url.endsWith(".dynamic")){
		dir = "/dynamic";
	}
	if(req.url == "/"){
		file = "/index.html";
	}else{
		file = req.url;
	}
  fs.readFile(__dirname + dir + file,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading ' + file);
    }
	if(req.url == "/app.js"){
				data = data.toString("utf8").replace("%HOSTURI%", "http://" + req.headers.host);
	}
    res.writeHead(200);
    res.end(data);
  });
}
io.configure(function (){
	io.enable('browser client etag');
	io.set('log level', 1);
	//io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
});
io.sockets.on('connection', function (socket) {
  socket.emit('news', { objective: 'yes' });
  socket.on('search', function (data) {
  	io.sockets.emit('resulted', {query: data.query});
  });
});
