"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastAnomaly = void 0;
const ws_1 = require("ws");
const webSocketRegistry_1 = require("./webSocketRegistry");
const broadcastAnomaly = (payload) => {
    const wss = (0, webSocketRegistry_1.getWebSocketServer)();
    if (!wss) {
        return;
    }
    const data = JSON.stringify(Object.assign({ event: "ANOMALY DETECTED" }, payload));
    wss.clients.forEach((client) => {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(data);
        }
    });
};
exports.broadcastAnomaly = broadcastAnomaly;
//# sourceMappingURL=anomalyBroadcaster.js.map