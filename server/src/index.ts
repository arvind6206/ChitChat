import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
  allSockets.push(socket);

  userCount += 1;

  console.log("user connected #" + userCount);

  socket.on("message", (msg) => {
    console.log("message received " + msg.toString());

    for (const s of allSockets) {
      s.send(msg.toString() + ": sent from server");
    }
  });
});
