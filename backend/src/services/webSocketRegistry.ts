import { WebSocketServer } from "ws";

let wss: WebSocketServer | null = null;

export const registerWebSocketServer = (server: WebSocketServer) => {
    wss = server;
};

export const getWebSocketServer = () => wss;
