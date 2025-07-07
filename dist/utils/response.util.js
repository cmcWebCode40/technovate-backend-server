"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
class ResponseUtil {
    static success(message, data) {
        return {
            status: 'success',
            message,
            ...(data && { data }),
        };
    }
    static error(message, errors) {
        return {
            status: 'error',
            message,
            ...(errors && { errors }),
        };
    }
}
exports.ResponseUtil = ResponseUtil;
