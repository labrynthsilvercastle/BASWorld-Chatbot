import { server as WebSocketServer } from "websocket";
import http from "http";

const webSocketServerPort = 8000;

const server = http.createServer();
server.listen(webSocketServerPort);
console.log("Server is listening on port", webSocketServerPort);

const webSocketServer = new WebSocketServer({
  httpServer: server,
});

const generateID = () => "id" + Math.random().toString(16).slice(2);
const connectedUsers = {};

webSocketServer.on("request", function (request) {
  var id = generateID();
  console.log("Connection request from " + request.origin + ".");

  const connection = request.accept(null, request.origin);
  connectedUsers[id] = connection;
  
  console.log(
    "Connection established: " +
      id +
      " in " +
      Object.getOwnPropertyNames(connectedUsers)
  );

  connection.on("message", function (message) {
    console.log("Received Message:", message.utf8Data);
    for (id in connectedUsers) {
        connectedUsers[id].sendUTF(message.utf8Data);
        console.log("Sent Message to: ", connectedUsers[id]);
    }
  });

});

