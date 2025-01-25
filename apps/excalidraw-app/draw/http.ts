import axios from "axios";

export const getExistingShapes = async (roomId: string) => {
    const res = await axios.get(`${`http://localhost:5000/chats/${roomId}`}`);
    const messages = res.data.messages;
    const shapes = messages.map((x: { message: string }) => {
      const messageData = JSON.parse(x.message);
      return messageData.shape;
    });
    return shapes;
  };