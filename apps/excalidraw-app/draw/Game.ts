import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Shape =
  | {
      type: "rectangle";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "triangle";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };
export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private socket: WebSocket;
  private clicked: boolean;
  private startX: number = 0;
  private startY: number = 0;
  private selectedTool: Tool = "rectangle";

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.existingShapes = [];
    this.init();
    this.initHandler();
    this.initMouseHandler();
  }
  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(tool: "circle" | "rectangle" | "triangle" | "pencil") {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  initHandler() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type == "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.ctx.fillStyle = "rgba(0,0,0,0.1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // Background fill
    this.existingShapes.map((shape) => {
      if (shape.type === "rectangle") {
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height); // Draw the rectangle
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  mouseDownHandler = (e) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };
  mouseUpHandler = (e) => {
    this.clicked = false;
    const height = e.clientY - this.startY;
    const width = e.clientX - this.startX;
    //@ts-ignore
    const selectedTool = this.selectedTool;
    console.log(selectedTool);

    let shape: Shape | null = null;
    if (selectedTool === "rectangle") {
      shape = {
        //@ts-ignore
        type: "rectangle",
        x: this.startX,
        y: this.startY,
        height,
        width,
      };
    } else if (selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        //@ts-ignore
        type: "circle",
        radius: radius,
        centerX: this.startX + radius,
        centerY: this.startY + radius,
      };
    }
    if (!shape) {
      return;
    }
    this.existingShapes.push(shape);
    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId: this.roomId,
      })
    );
  };

  mouseMoveHandler = (e) => {
    if (this.clicked) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.clearCanvas();
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      //@ts-ignore
      const selectedTool = this.selectedTool;
      console.log(selectedTool);

      if (selectedTool === "rectangle") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  };

  initMouseHandler = () => {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  };
}
