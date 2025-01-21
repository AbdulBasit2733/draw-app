import { initDraw } from "@/draw";
import React, { useEffect, useRef } from "react";

const Canvas = ({ roomId, socket }: { roomId: string, socket:WebSocket }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);
  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </div>
  );
};

export default Canvas;
