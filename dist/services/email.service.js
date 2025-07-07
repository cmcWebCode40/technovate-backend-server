"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = require("../utils/logger");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT ?? '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async sendOtpEmail(email, _firstName, otp) {
        try {
            logger_1.logger.info(`OTP email would be sent to ${email} with OTP: ${otp}`);
        }
        catch (error) {
            logger_1.logger.error('Failed to send OTP email:', error);
            throw new Error('Failed to send OTP email');
        }
    }
}
exports.EmailService = EmailService;
