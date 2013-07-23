var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

var newPostFormHTML = fs.readFileSync('views/posts/new.html');

function renderNewPostForm(request, response) {
	response.writeHead(200, {
  	'Content-type': 'text/html; charset-utf-8'
  });
  response.end(newPostFormHTML);
};

function addNewPost (request, response) {
	console.log('Received a new post');
	response.end();
};


//Utils
function render404(request, response) {
  response.writeHead(404);
  response.end('404 File Not Found');
};

function parseBody(request, response) {
  var body = '';
  request.on('data', function(chunk){
  	body += chunk;
  });
  request.on('end', function(){
  	callback(body)
  });
};

//Routes
var newPostFormRegex = new RegExp('^/posts/new/?$');
var newPostRegex = new RegExp('^/posts/?$');

//Server
var server = http.createServer(function(request, response){
  var pathname = url.parse(request.url).pathname;
  if (newPostFormRegex.test(pathname)) {
  	renderNewPostForm(request, response);
  }else if (newPostRegex.test(pathname)) {
    addNewPost(request, response);
  }else {
  	render404(request, response);
  }
});

server.listen(8000);

console.log('listening on http://127.0.0.1:8000');