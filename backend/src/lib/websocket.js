import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

export default function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });

  const clients = new Map();

  wss.on("connection", async (ws, req) => {
    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies.jwt;

      if (!token) {
        ws.close();
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      clients.set(userId, ws);

      ws.on("close", () => {
        clients.delete(userId);
      });
    } catch (error) {
      console.error("WebSocket connection error:", error);
      ws.close();
    }
  });

  return {
    clients,
    broadcast: (chatId, message) => {
      clients.forEach((ws) => {
        if (ws.readyState === 1) {
          ws.send(JSON.stringify({ chatId, message }));
        }
      });
    },
  };
}
