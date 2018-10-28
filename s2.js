var app = require('express')(); 
var fs = require('fs'); 
var http = require('http'); 
var https = require('https'); 
var privateKey = fs.readFileSync('private.pem', 'utf8'); 
var certificate = fs.readFileSync('file.crt', 'utf8'); 
var credentials = {key: privateKey, cert: certificate}; 
var httpServer = http.createServer(app); 
var httpsServer = https.createServer(credentials, app); 
var PORT = 8080; 
var SSLPORT = 8081; 
httpServer.listen(PORT, function() { 
	console.log('HTTP Server is running on: http://localhost:%s', PORT); 
}); 
httpsServer.listen(SSLPORT, function() { 
	console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT); 
}); // Welcome 
app.get('/', function(req, res) { 
	console.log("get /")
	if(req.protocol === 'https'){ 
		res.status(200).send('Welcome to Safety Land!'); 
	} else { 
		res.status(200).send('Welcome!'); 
	} 
});
