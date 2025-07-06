import mongoose from 'mongoose';

export interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  database: {
    status: string;
  };
}

export class HealthService {
  async getHealthStatus(): Promise<HealthStatus> {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

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