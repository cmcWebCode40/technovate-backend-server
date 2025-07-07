"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const response_util_1 = require("../utils/response.util");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            res.status(401).json(response_util_1.ResponseUtil.error('No token provided'));
            return;
        }
        const token = authHeader?.split(" ")[1];
        const decoded = (0, jwt_util_1.verifyToken)(token);
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        next();
    }
    catch {
        res.status(401).json(response_util_1.ResponseUtil.error('Invalid or expired token'));
    }
};
exports.authMiddleware = authMiddleware;
