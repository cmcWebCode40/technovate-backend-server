import { Request, Response } from 'express';
import { HealthService } from '../services/health.service';

export class HealthController {
  private readonly healthService: HealthService;

  constructor() {
    this.healthService = new HealthService();
  }

  checkHealth = async (_req: Request, res: Response): Promise<void> => {
    const health = await this.healthService.getHealthStatus();
    res.status(200).json(health);
  };
}