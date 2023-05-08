import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8080 });

server.on("connection", (ws) => {
  console.log("New connection", server.clients.size);

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    server.clients.forEach((client) => {
      client.send(`A message was sent: ${message}`);
    });
  });
});
