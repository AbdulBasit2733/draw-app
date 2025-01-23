import { initDraw } from "@/draw";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import { Circle, RectangleHorizontal, Triangle } from "lucide-react";

type Shape = "circle" | "rectangle" | "triangle";

const Canvas = ({ roomId, socket }: { roomId: string; socket: WebSocket }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<Shape>("circle");
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  useEffect(() => {
    //@ts-ignore
    window.selectedTool = selectedTool
  },[selectedTool])

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
  selectedTool: Shape;
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
