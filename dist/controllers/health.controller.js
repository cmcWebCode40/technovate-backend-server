"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const health_service_1 = require("@services/health.service");
class HealthController {
    constructor() {
        this.checkHealth = async (_req, res) => {
            const health = await this.healthService.getHealthStatus();
            res.status(200).json(health);
        };
        this.healthService = new health_service_1.HealthService();
    }
}
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map