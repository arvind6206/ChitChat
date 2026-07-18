import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User{
  socket: WebSocket;
  room: string
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on('message', (message) => {
    const parsedMessage = JSON.parse(message as unknown as string)
    if(parsedMessage.type === 'join'){
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId
      })
    }

    if(parsedMessage.type === "chat"){
      let currUserRoom = null
      for(let i = 0; i < allSockets.length; i++){
        if(allSockets[i].socket === socket){
          currUserRoom = allSockets[i].room
        }
      }

      for(let i = 0; i < allSockets.length; i++){
        if(allSockets[i].room === currUserRoom){
          allSockets[i]?.socket.send(parsedMessage.payload.message)
        }
      }

    }
  })

 
  });
