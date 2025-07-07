"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const errorHandler = (err, req, res, _next) => {
    const statusCode = err.statusCode ?? 500;
    const message = err.message || 'Internal Server Error';
    logger_1.logger.error(`Error ${statusCode}: ${message}`, {
        error: err,
        request: {
            method: req.method,
            url: req.url,
            body: req.body,
            params: req.params,
            query: req.query,
        },
    });
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (_req, res) => {
    res.status(404).json({
        success: false,
        error: {
            message: 'Resource not found',
        },
    });
};
exports.notFoundHandler = notFoundHandler;
