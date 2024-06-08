// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = require('./comments');

var server = http.createServer(function(request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', function(err, data) {
            if (err) {
                throw err;
            }
            response.end(data);
        });
    } else if (pathname === '/getComments') {
        var data = comments.get();
        response.end(data);
    } else if (pathname === '/addComment') {
        var comment = urlObj.query.comment;
        comments.add(comment);
        response.end('');
    } else {
        fs.readFile(path.join(__dirname, pathname), 'utf-8', function(err, data) {
            if (err) {
                throw err;
            }
            response.end(data);
        });
    }
});

server.listen(3000, function() {
    console.log('Server is running at port 3000');
});