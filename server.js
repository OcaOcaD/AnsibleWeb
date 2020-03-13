let clientCount = 0
const express = require('express');
//Server stuff
var app = express();
//Socket.io
var socket = require('socket.io');
var fs = require("fs");
//Body Parser
const bodyParser = require('body-parser');
//ENV
require('dotenv/config');
// shit
//Use Body Parser for requests
app.use(bodyParser.json());
//MAIN ROUTE
app.use( express.static('public') );
//Import scorecboard
//MIDDLEWARE(S)     
    //app.use('/scoreboard', scoreRoute)
    
//Listinig port
//var server = app.listen( process.env.PORT || 3000);
var server = app.listen(3000);
console.log("SERVING ANSIBLE");
var io = socket(server);
/*Client events*/
io.on('connection', function(socket){
    clientCount++;
    console.log("Número de clientes..." + clientCount);
    //Create a Room if needed or alert if alredy does
    socket.on('changeName', (name) => {
        console.log("The name should be: ", name)
        createFile( name )
        runCommand()
    } )
})


/*
*
*
*/
const { exec } = require("child_process");
runCommand = () =>{
    console.log("running a command")
    //exec("ls -la", (error, stdout, stderr) => {
    exec("ansible-playbook /etc/ansible/playbooks/jsNameChanger.yml", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

}
/**
 * 
 * 
 */

// writeFile function with filename, content and callback function
createFile = ( name ) => {
    let content = "---\n\n- hosts: ROUTERS\n  gather_facts: false\n  connection: local\n\n  tasks:\n    - name: Change Hostname R1\n      ios_config:\n        lines:\n          - hostname "+name
    fs.writeFile('/etc/ansible/playbooks/jsNameChanger.yml', content, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      });  
}
