// var socket = io.connect( process.env.PORT || 'http://localhost:3000');
var socket = io();
console.log("I SAY SOMETHING");

startChangingName = ( ip, name ) => {
    socket.emit('changeName', name);
}