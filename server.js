'use strict';

const fs = require('fs');
var http=require('http');

let settingRawdata = fs.readFileSync('setting.json');
let setting = JSON.parse(settingRawdata);


var server= http.createServer((function(request,response)
{
    //
    //'Content-Type': 'text/plain; charset=utf-8',
    //'Content-Type': 'text/html; charset=UTF-8',
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff'
    });
	let date_ob = new Date();
    console.log(date_ob + " - " + request.connection.remoteAddress + " - " + request.url);
	let settingRawdata = fs.readFileSync('setting.json');
	let setting = JSON.parse(settingRawdata);

    try {
		if(request.url === "/favicon.ico" )
        {
            response.end("");  // bad parameter
            return;
        }
        // const regex = RegExp(/\/[A-Za-z_][\w\-]*/);
        let regexResult = request.url.match(/\/[A-Za-z_][\w\-]*/);
        let [discovered] = regexResult;
        if(discovered !== request.url)
        {
            console.log("Bad parameter - Nothing has ran...")
            response.end("");  // bad parameter
            return;
        }

        // if (request.url==="/"){
        //     response.end("2");//Please send the parameter
        //     return;
        // }
        
        let script= setting.scripts.find(x => "/"+x.key===request.url);
        if (!script){
            console.log("Not found - Nothing has ran...")
            response.end(""); //No items found
            return;
        }

        if (!script.isActive){
            console.log("Is not enabled - Nothing has ran...")
            response.end(""); //script is not enabled
            return;
        }

        response.write('<body style="font-family : Courier New"> Beginning\n');

        exec(script.app,[script.path], response);
    } catch(e) {
        console.log("Error while running the job...\n" + e);
        response.end("");  // bad parameter

    }
    // response.end();
    // response.end("Finished\n");
}));
server.listen(setting.port);


//------------------------------------------------

function exec(commandStr,params, response){

    const { spawn } = require("child_process");

    const command = spawn(commandStr,params);
    
    command.stdout.on("data", data => {
        let newData = data.toString().replace("\n","</br>");
        response.write(`${newData}`);
    });
    
    command.stderr.on("data", data => {
        response.write(`<div style="color : orange">${data}</div>\n`);
    });

    command
    
    command.on('error', (error) => {
        response.write(`<div style="color : red">${error.message}</div>\n`);
    });
    
    command.on("close", code => {
        response.end(`<div style="color : green">Process finished with ${code}</div>\n`);
    });

}