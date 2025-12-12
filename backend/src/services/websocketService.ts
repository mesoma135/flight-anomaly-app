import { WebSocketServer } from "ws";
import { getLiveFlight, getActiveFlights } from "../cache/flightCache";

let wss: WebSocketServer;

export const initWebSocket = () => {
    wss = new WebSocketServer({ port: 7000 });
    console.log("WebSocket Server Initialized");

    wss.on("connection", (ws) => {
        console.log("Client Connected");
        ws.on("close", () => {
            console.log("Client Disconnected");
        });
    });
}

const startBroadcastLoop = () =>{
    setInterval(async () => {
        if (!wss || wss.clients.size === 0){
            return;
        }
        
        const activeFlightIds = await getActiveFlights();
        const flightDetailsList: any[] = [];

        for (let i=0 as number; i < activeFlightIds.length; i++){
            const flightId = activeFlightIds[i];

            if(!flightId){
                continue;
            }

            const flightDetails = await getLiveFlight(flightId);

            if(!flightDetails){
                continue;
            }
            flightDetailsList.push({
                id: flightId,
                ...flightDetails
            });
        }

        const data = JSON.stringify({
            type: "live flights",
            flights: flightDetailsList,
            timestamp: Date.now()
        });
        wss.clients.forEach((client) => {
            if(client.readyState == 1){
                client.send(data);
            }
        });
    }, 2000);
};
