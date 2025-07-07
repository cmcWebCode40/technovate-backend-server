"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class HealthService {
    async getHealthStatus() {
        const dbStatus = mongoose_1.default.connection.readyState === 1 ? 'connected' : 'disconnected';
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV ?? 'development',
            database: {
                status: dbStatus,
            },
        };
    }
}
exports.HealthService = HealthService;
