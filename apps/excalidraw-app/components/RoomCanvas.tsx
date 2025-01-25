"use client";
import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import { WS_URL } from "@/config";

const RoomCanvas = ({ roomId }: { roomId: string }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOWZjODNiZi0yZDMzLTQ2YTctODUxMy03ZmI0NjFlMWE2NWEiLCJpYXQiOjE3Mzc3MDI3MTR9.-y4jp4x4_nHhYGwfcveF577TOooMeeG9vLIv2CXe_Pc`
    );
    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );
    };
  }, []);

  if (!socket) {
    return <div>Connecting To The Server.....</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
};

export default RoomCanvas;
