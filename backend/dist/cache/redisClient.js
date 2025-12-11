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
exports.connectRedis = void 0;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    username: String(process.env.REDIS_USERNAME) || "",
    password: String(process.env.REDIS_PASSWORD) || "",
    socket: {
        host: String(process.env.REDIS_HOST) || "",
        port: Number(process.env.REDIS_PORT) || 15717
    }
});
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        yield client.set('foo', 'bar');
        const result = yield client.get('foo');
        console.log(result); // >>> bar
    }
    catch (error) {
        console.error("Redis Client Error", error);
    }
});
exports.connectRedis = connectRedis;
//# sourceMappingURL=redisClient.js.map