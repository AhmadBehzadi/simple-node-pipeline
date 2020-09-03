



var http=require('http')
var server= http.createServer((function(request,response)
{
    response.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff'});

    // var child_process = require('child_process');
    // child_process.exec('ls', function(error, stdout, stderr) {
    //     response.write(stdout);
    //     response.end();
    // });
    response.write('Beginning\n');
    var count = 10;
    var io = setInterval(function() {
        response.write('Doing ' + count.toString() + '\n');
        count--;
        if (count === 0) {
            response.end('Finished\n');
            clearInterval(io);
        }
    }, 1000);
    // response.end();
	// response.end("Finished\n");
}));
server.listen(7000);