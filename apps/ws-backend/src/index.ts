import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    ws.close();
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") ?? "";

  const decodedData = jwt.verify(token, JWT_SECRET);
  if(typeof decodedData=="string"){
    ws.close();
    return
  }
  
  if(!decodedData || !decodedData.userId){
    ws.close();
    return
  }
  ws.on("message", function message(data) {
    ws.send("PONG");
  });
});
