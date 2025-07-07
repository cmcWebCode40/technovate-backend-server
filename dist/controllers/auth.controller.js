"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_validation_1 = require("../validations/auth.validation");
const response_util_1 = require("../utils/response.util");
const zod_1 = require("zod");
class AuthController {
    constructor() {
        this.signUp = async (req, res, next) => {
            try {
                const validatedData = auth_validation_1.signUpSchema.parse(req.body);
                const result = await this.authService.signUp(validatedData);
                res
                    .status(201)
                    .json(response_util_1.ResponseUtil.success("Account created successfully", result));
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).json(response_util_1.ResponseUtil.error("Validation failed", error.errors.map((e) => e.message)));
                    return;
                }
                if (error instanceof Error) {
                    res.status(400).json(response_util_1.ResponseUtil.error(error.message));
                    return;
                }
                next(error);
            }
        };
        this.verifyOtp = async (req, res, next) => {
            try {
                const validatedData = auth_validation_1.verifyOtpSchema.parse(req.body);
                const user = await this.authService.verifyOtp(validatedData.email, validatedData.otp);
                res
                    .status(200)
                    .json(response_util_1.ResponseUtil.success("Account verified successfully", { user }));
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).json(response_util_1.ResponseUtil.error("Validation failed", error.errors.map((e) => e.message)));
                    return;
                }
                if (error instanceof Error) {
                    res.status(400).json(response_util_1.ResponseUtil.error(error.message));
                    return;
                }
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const validatedData = auth_validation_1.loginSchema.parse(req.body);
                const result = await this.authService.login(validatedData);
                res.status(200).json(response_util_1.ResponseUtil.success("Login successful", result));
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).json(response_util_1.ResponseUtil.error("Validation failed", error.errors.map((e) => e.message)));
                    return;
                }
                if (error instanceof Error) {
                    res.status(401).json(response_util_1.ResponseUtil.error(error.message));
                    return;
                }
                next(error);
            }
        };
        this.resendOtp = async (req, res, next) => {
            try {
                const validatedData = auth_validation_1.resendOTPSchema.parse(req.body);
                const result = await this.authService.resendOtp(validatedData.email);
                res.status(200).json(response_util_1.ResponseUtil.success("OTP sent successful", result));
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).json(response_util_1.ResponseUtil.error("Validation failed", error.errors.map((e) => e.message)));
                    return;
                }
                if (error instanceof Error) {
                    res.status(401).json(response_util_1.ResponseUtil.error(error.message));
                    return;
                }
                next(error);
            }
        };
        this.getUser = async (req, res, next) => {
            try {
                if (!req.userId) {
                    res.status(401).json(response_util_1.ResponseUtil.error("Unauthorized"));
                    return;
                }
                const user = await this.authService.getUserById(req.userId);
                res
                    .status(200)
                    .json(response_util_1.ResponseUtil.success("User details fetched successfully", { user }));
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json(response_util_1.ResponseUtil.error(error.message));
                    return;
                }
                next(error);
            }
        };
        this.deleteAccount = async (req, res, next) => {
            try {
                if (!req.userId) {
                    res.status(401).json(response_util_1.ResponseUtil.error("Unauthorized"));
                    return;
                }
                await this.authService.deleteAccount(req.userId);
                res
                    .status(200)
                    .json(response_util_1.ResponseUtil.success("Account deleted successfully"));
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json(response_util_1.ResponseUtil.error(error.message));
                    return;
                }
                next(error);
            }
        };
        this.resetPassword = async (req, res, next) => {
            try {
                const validatedData = auth_validation_1.resetPasswordSchema.parse(req.body);
                await this.authService.resetPassword(validatedData.email, validatedData.newPassword);
                res.status(200).json(response_util_1.ResponseUtil.success("Password reset successfully"));
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).json(response_util_1.ResponseUtil.error("Validation failed", error.errors.map((e) => e.message)));
                    return;
                }
                if (error instanceof Error) {
                    res.status(400).json(response_util_1.ResponseUtil.error(error.message));
                    return;
                }
                next(error);
            }
        };
        this.linkDevice = async (req, res, next) => {
            try {
                if (!req.userId) {
                    res.status(401).json(response_util_1.ResponseUtil.error("Unauthorized"));
                    return;
                }
                const validatedData = auth_validation_1.linkDeviceSchema.parse(req.body);
                const result = await this.authService.linkDevice(req.userId, validatedData.powerBoxId);
                res
                    .status(200)
                    .json(response_util_1.ResponseUtil.success("Device linked successfully", result));
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).json(response_util_1.ResponseUtil.error("Validation failed", error.errors.map((e) => e.message)));
                    return;
                }
                if (error instanceof Error) {
                    res.status(400).json(response_util_1.ResponseUtil.error(error.message));
                    return;
                }
                next(error);
            }
        };
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
