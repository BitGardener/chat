const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const HOST = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//---------------------------------


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on('disconnect', () => {
       console.log("a user disconnected");
    });
    socket.on('chat message', (msg) => {
        console.log("message: " + msg);
        io.emit('chat message', msg);
    });
    //console.log(socket);
    //WHAT IS THE SOCKET PARAMETER
    //COMPARE SOCKETS WHEN CONNECTED TO MORE CLIENTS, HOW TO THEY DIFFER?
});

http.listen(PORT, HOST, () => {
    console.log("App listening on " + HOST, " port " + PORT);
});