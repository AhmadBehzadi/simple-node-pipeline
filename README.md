# simple-node-pipeline
A simple node web-server application that can run any script on the server. This application can be as a simple webhook and you can use it as your CI/CD application. It's ultra light weight and very simple to config.

### Preparing the project
Clone this repo on your server. Create a copy of `sample-setting.json` and name it to `setting.json`. You can change the port number. Set this port number into your incomming firewall rules to allow incomming traffics. All of the scripts are running by the user account that is running this application. If you are using this application directly from an administrator account, it can execute like what you are running in your command prompt. Note that you should configure any environment or other settings in your scripts. I added two sample script, one for a Dot Net Core WebAPI application and one for a React.js application


### Defining the scripts
This app just runs some scripts that are saved in your machine. There is an array object in the `setting.json` file, called `scripts`. You can add your script names and their file path here. The `key` is used to calling the related script from outside of the server.


### Starting the application
Before running this application you should install Node.js 7+ on your server, and add the node bin directory to your path variable in the environment variables. Also if you are using IIS, add this path in the environments too `%systemroot%\system32\inetsrv`, It's used for `appcmd` command.

Open a command prompt on in the application directory and run

```
node server.js
```

### Running a script
After you configured your server, it's enough to call your server IP with port number you've specified in the `setting.json`, followed by the **script key** as bellow.
```
http://[YOUR SERVER IP]:[PORT]/[SCRIPT KEY]
```


The server will try to run the script and writes the console output directly into the browser viewport. 



# Disclamer
This app is only a simple code that you may use it by your own risk. No security or proper functionality is guranteed, **PLEASE USE IT BY YOU OWN RISK.**


### Pull request
I'll be happy if you fork this repo and send me any upgrades for this app.
