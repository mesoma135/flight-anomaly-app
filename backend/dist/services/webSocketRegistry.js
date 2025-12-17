"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebSocketServer = exports.registerWebSocketServer = void 0;
let wss = null;
const registerWebSocketServer = (server) => {
    wss = server;
};
exports.registerWebSocketServer = registerWebSocketServer;
const getWebSocketServer = () => wss;
exports.getWebSocketServer = getWebSocketServer;
//# sourceMappingURL=webSocketRegistry.js.map