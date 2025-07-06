# Technovate Backend Server

Backend API server for the Power Box project built with Node.js, Express, MongoDB, and TypeScript following Domain-Driven Design (DDD) principles.

## Features

- **TypeScript** for type safety and better developer experience
- **Express.js** web framework
- **MongoDB** with Mongoose ODM
- **Domain-Driven Design** architecture
- **Environment-based** configuration
- **Error handling** and logging
- **Security** with Helmet
- **CORS** enabled
- **Compression** for performance

##  Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd technovate-backend-server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/powerbox
JWT_SECRET=your-secret-key-here
```

##  Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with hot-reloading enabled using nodemon.

### Production Mode
```bash
# Build the TypeScript code
npm run build

# Start the server
npm start
```

## Project Structure

```
technovate-backend-server/
├── src/
│   ├── config/         # Configuration files
│   │   ├── database.ts # Database connection setup
│   │   └── env.ts      # Environment variables
│   ├── controllers/    # Request handlers
│   │   └── health.controller.ts
│   ├── middleware/     # Express middleware
│   │   └── error.middleware.ts
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   │   ├── health.routes.ts
│   │   └── index.ts
│   ├── services/       # Business logic
│   │   └── health.service.ts
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   │   └── logger.ts
│   └── server.ts       # Application entry point
├── dist/               # Compiled JavaScript (generated)
├── .env                # Environment variables (not in git)
├── .env.example        # Example environment variables
├── .gitignore          # Git ignore file
├── nodemon.json        # Nodemon configuration
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## API Endpoints

### Health Check
```http
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-07-05T12:00:00.000Z",
  "uptime": 10.123456789,
  "environment": "development",
  "database": {
    "status": "connected"
  }
}
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

##  Architecture

This project follows Domain-Driven Design (DDD) principles:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and domain rules
- **Models**: Define data structures and database schemas
- **Routes**: Define API endpoints and route handling
- **Middleware**: Process requests before they reach controllers
- **Utils**: Shared utility functions and helpers
- **Config**: Application configuration and setup

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Application environment | development |
| PORT | Server port | 3000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/powerbox |
| JWT_SECRET | Secret key for JWT tokens | your-secret-key-here |

##  Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the ISC License.

##  Team

Power Box Development Team

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running on your system
- Check if the MongoDB URI in `.env` is correct
- Verify network connectivity to MongoDB server

### Port Already in Use
- Check if another process is using port 3000
- Change the PORT in `.env` to a different value

### TypeScript Compilation Errors
- Ensure all dependencies are installed: `npm install`
- Delete `node_modules` and `package-lock.json`, then reinstall

## Support

For support, email your-team@example.com or create an issue in the repository.