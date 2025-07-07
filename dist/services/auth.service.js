"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const logger_1 = require("../utils/logger");
const user_model_1 = require("../models/user.model");
const email_service_1 = require("./email.service");
const otp_utils_1 = require("../utils/otp.utils");
const jwt_util_1 = require("../utils/jwt.util");
class AuthService {
    constructor() {
        this.emailService = new email_service_1.EmailService();
    }
    async signUp(data) {
        const formattedPhone = this.formatNigerianPhoneNumber(data.phoneNumber);
        const existingUser = await user_model_1.User.findOne({
            $or: [{ email: data.email }, { phoneNumber: formattedPhone }],
        });
        if (existingUser) {
            throw new Error("User with this email or phone number already exists");
        }
        const otp = (0, otp_utils_1.generateOTP)();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        const user = await user_model_1.User.create({
            ...data,
            phoneNumber: formattedPhone,
            otp,
            otpExpiry,
        });
        await this.emailService.sendOtpEmail(user.email, user.firstName, otp);
        const userResponse = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            planBalance: user.planBalance,
            planType: user.planType,
            powerBoxId: user.powerBoxId,
            isDeviceLinked: user.isDeviceLinked,
            isVerified: user.isVerified,
        };
        return { user: userResponse, otp };
    }
    async verifyOtp(email, otp) {
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.isVerified) {
            throw new Error("User already verified");
        }
        if (!user.otp || !user.otpExpiry) {
            throw new Error("No OTP found for this user");
        }
        if (user.otp !== otp) {
            throw new Error("Invalid OTP");
        }
        if (user.otpExpiry < new Date()) {
            throw new Error("OTP has expired");
        }
        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        logger_1.logger.info(`User ${user.email} successfully verified`);
        return {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            isVerified: user.isVerified,
        };
    }
    formatNigerianPhoneNumber(phone) {
        let cleaned = phone.replace(/[\s-]/g, "");
        if (cleaned.startsWith("0")) {
            cleaned = cleaned.substring(1);
        }
        return `+234${cleaned}`;
    }
    async login(data) {
        const { email, password } = data;
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        if (!user.isVerified) {
            throw new Error("Please verify your email before logging in");
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
        const token = (0, jwt_util_1.generateToken)({
            userId: user._id.toString(),
            email: user.email,
        });
        user.lastLogin = new Date();
        await user.save();
        logger_1.logger.info(`User ${user.email} logged in successfully`);
        const userResponse = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            planBalance: user.planBalance,
            planType: user.planType,
            powerBoxId: user.powerBoxId,
            isDeviceLinked: user.isDeviceLinked,
            isVerified: user.isVerified,
        };
        return { user: userResponse, token };
    }
    async resendOtp(email) {
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.isVerified) {
            throw new Error("User already verified");
        }
        if (user.otpExpiry && user.otpExpiry > new Date()) {
            const remainingMinutes = Math.ceil((user.otpExpiry.getTime() - Date.now()) / (60 * 1000));
            throw new Error(`Please wait ${remainingMinutes} minutes before requesting a new OTP`);
        }
        const otp = (0, otp_utils_1.generateOTP)();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        await this.emailService.sendOtpEmail(user.email, user.firstName, otp);
        logger_1.logger.info(`New OTP for ${user.email}: ${otp}`);
        if (process.env.NODE_ENV === "development") {
            return { message: "OTP sent successfully", otp };
        }
        return { message: "OTP sent successfully" };
    }
    async getUserById(userId) {
        const user = await user_model_1.User.findById(userId).select("-password -otp -otpExpiry");
        if (!user) {
            throw new Error("User not found");
        }
        return {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            planBalance: user.planBalance,
            planType: user.planType,
            powerBoxId: user.powerBoxId,
            isDeviceLinked: user.isDeviceLinked,
            isVerified: user.isVerified,
        };
    }
    async deleteAccount(userId) {
        const user = await user_model_1.User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error("User not found");
        }
        logger_1.logger.info(`User account deleted: ${user.email}`);
    }
    async resetPassword(email, newPassword) {
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.isVerified) {
            throw new Error("Please verify your OTP first");
        }
        user.password = newPassword;
        await user.save();
        logger_1.logger.info(`Password reset for user: ${user.email}`);
    }
    async linkDevice(userId, powerBoxId) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.isDeviceLinked) {
            throw new Error('Device already linked');
        }
        user.isDeviceLinked = true;
        user.powerBoxId = powerBoxId;
        await user.save();
        logger_1.logger.info(`Device linked for user: ${user.email}, PowerBox ID: ${powerBoxId}`);
        return {
            _id: user._id,
            email: user.email,
            isDeviceLinked: user.isDeviceLinked,
            powerBoxId: user.powerBoxId,
        };
    }
}
exports.AuthService = AuthService;
