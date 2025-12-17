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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const redisClient_1 = require("./cache/redisClient");
const websocketService_1 = require("./services/websocketService");
const express_1 = __importDefault(require("express"));
const flightRoutes_1 = __importDefault(require("./routes/flightRoutes"));
const openSkyAPIRoutes_1 = __importDefault(require("./routes/openSkyAPIRoutes"));
const anomalyRoutes_1 = __importDefault(require("./routes/anomalyRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5050;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        const server = http_1.default.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        console.log("Connecting to Redis");
        yield (0, redisClient_1.connectRedis)();
        console.log("WebSocket Initializing...");
        (0, websocketService_1.initWebSocket)(); //Initialize Websocket Server
    }
    catch (error) {
        console.error("Failed to start server: ", error);
    }
}))();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/flight", flightRoutes_1.default);
app.use("/api/opensky", openSkyAPIRoutes_1.default);
app.use("/api/anomalies", anomalyRoutes_1.default);
//# sourceMappingURL=server.js.map