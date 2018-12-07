let socket = new WebSocket("ws://localhost:3000");
socket.onmessage = function(event){
    console.log(event);
}
socket.onopen = function(){
    socket.send("Hello from the client!");
};

