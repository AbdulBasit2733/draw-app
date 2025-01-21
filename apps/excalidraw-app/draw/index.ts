import axios from "axios";

type Shape = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
};

export const initDraw = async (
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  // let existingShapes: Shape[] = await getExistingShapes(roomId);
  let existingShapes: Shape[] = await getExistingShapes(roomId);
  // let existingShapes: Shape[] = [];

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type == "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShapes.push(parsedShape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };

  clearCanvas(existingShapes, canvas, ctx);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  // ctx.fillStyle = "rgba(0,0,0,0.1)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;

    startX = e.clientX;
    startY = e.clientY;
  });
  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const height = e.clientY - startY;
    const width = e.clientX - startX;
    existingShapes.push({
      type: "rect",
      x: startX,
      y: startY,
      height,
      width,
    });
  });
  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
};

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Background fill
  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height); // Draw the rectangle
    }
  });
}

const getExistingShapes = async (roomId: string) => {
  const res = await axios.get(`${"http://localhost:5000/chats/7"}`);
  const messages = res.data.messages;
  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData;
  });
  return shapes;
};
