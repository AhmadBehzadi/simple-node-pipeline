'use strict';

const fs = require('fs');
var http=require('http');


let settingRawdata = fs.readFileSync('setting.json');
let setting = JSON.parse(settingRawdata);
console.log(setting);



var server= http.createServer((function(request,response)
{

    response.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff'
    });

    console.log(request.url);

    if (request.url==="/"){
        response.end("Please send the parameter");
        return;
    }

    let script= setting.scripts.find(x => "/"+x.key===request.url);
    if (!script){
        response.end("No items found");
        return;
    }

    if (!script.isActive){
        response.end("script is not enabled");
        return;
    }

    response.write('Beginning\n');

    exec(script.app,[script.path], response);

    // response.end();
    // response.end("Finished\n");
}));
server.listen(setting.port);


//------------------------------------------------

function exec(commandStr,params, response){

    const { spawn } = require("child_process");

    const command = spawn(commandStr,params);
    
    command.stdout.on("data", data => {
        response.write(`${data}`);
    });
    
    command.stderr.on("data", data => {
        response.write(`stderr: ${data}\n`);
    });
    
    command.on('error', (error) => {
        response.write(`error: ${error.message}\n`);
    });
    
    command.on("close", code => {
        response.end(`Process finished with ${code},[]\n`);
    });

}