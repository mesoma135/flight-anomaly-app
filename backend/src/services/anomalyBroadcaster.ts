import { WebSocket } from "ws";
import { getWebSocketServer } from "./webSocketRegistry";

export const broadcastAnomaly = (payload: {
    flightIcao24: string;
    type: string;
    message: string;
    timestamp: number;
}) => {
    const wss = getWebSocketServer();

    if(!wss){
        return;
    }
    const data = JSON.stringify({
        event: "ANOMALY DETECTED",
        ...payload
    });
    
    wss .clients.forEach((client: WebSocket) =>{
        if(client.readyState === WebSocket.OPEN){
            client.send(data);
        }
    });
};