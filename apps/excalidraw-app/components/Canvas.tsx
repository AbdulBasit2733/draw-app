import { initDraw } from "@/draw";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import { Circle, RectangleHorizontal, Triangle } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rectangle" | "triangle" | "pencil";

const Canvas = ({ roomId, socket }: { roomId: string; socket: WebSocket }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);
      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

  return (
    <div className=" bg-slate-950 h-[100vh] overflow-hidden">
      <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
};

export default Canvas;

function TopBar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: () => void;
}) {
  return (
    <div className="w-full flex justify-center fixed top-5">
      <div className="flex justify-center items-center gap-2 bg-slate-900 w-fit rounded-lg px-5">
        <IconButton
          isActivated={selectedTool === "rectangle"}
          onClick={() => setSelectedTool("rectangle")}
          icon={<RectangleHorizontal />}
        />
        <IconButton
          isActivated={selectedTool === "circle"}
          icon={<Circle />}
          onClick={() => setSelectedTool("circle")}
        />
        <IconButton
          isActivated={selectedTool === "triangle"}
          icon={<Triangle />}
          onClick={() => setSelectedTool("triangle")}
        />
      </div>
    </div>
  );
}
