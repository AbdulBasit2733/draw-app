import axios from "axios";



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
    //@ts-ignore
    const selectedTool = window.selectedTool;
    let shape: Shape | null = null;
    if (selectedTool === "rectangle") {
      shape = {
        //@ts-ignore
        type: "rectangle",
        x: startX,
        y: startY,
        height,
        width,
      };
    } else if (selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        //@ts-ignore
        type: "circle",
        radius: radius,
        centerX: startX + radius,
        centerY: startY + radius,
      };
    }
    if (!shape) {
      return;
    }
    existingShapes.push(shape);
    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId,
      })
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      //@ts-ignore
      const selectedTool = window.selectedTool;
      console.log(selectedTool);

      if (selectedTool === "rectangle") {
        ctx.strokeRect(startX, startY, width, height);
      } else if (selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = startX + radius;
        const centerY = startY + radius;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
      }
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
    if (shape.type === "rectangle") {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height); // Draw the rectangle
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    }
  });
}


