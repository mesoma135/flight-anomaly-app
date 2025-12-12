"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebSocket = void 0;
const ws_1 = require("ws");
const flightCache_1 = require("../cache/flightCache");
let wss;
const initWebSocket = () => {
    wss = new ws_1.WebSocketServer({ port: 7001 });
    console.log("WebSocket Server Initialized");
    wss.on("connection", (ws) => {
        console.log("Client Connected");
        ws.on("close", () => {
            console.log("Client Disconnected");
        });
    });
};
exports.initWebSocket = initWebSocket;
const startBroadcastLoop = () => {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!wss || wss.clients.size === 0) {
            return;
        }
        const activeFlightIds = yield (0, flightCache_1.getActiveFlights)();
        const flightDetailsList = [];
        for (let i = 0; i < activeFlightIds.length; i++) {
            const flightId = activeFlightIds[i];
            if (!flightId) {
                continue;
            }
            const flightDetails = yield (0, flightCache_1.getLiveFlight)(flightId);
            if (!flightDetails) {
                continue;
            }
            flightDetailsList.push(Object.assign({ id: flightId }, flightDetails));
        }
        const data = JSON.stringify({
            type: "live flights",
            flights: flightDetailsList,
            timestamp: Date.now()
        });
        wss.clients.forEach((client) => {
            if (client.readyState == 1) {
                client.send(data);
            }
        });
    }), 2000);
};
//# sourceMappingURL=websocketService.js.map