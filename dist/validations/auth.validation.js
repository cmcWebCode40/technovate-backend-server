"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkDeviceSchema = exports.resetPasswordSchema = exports.resendOTPSchema = exports.loginSchema = exports.verifyOtpSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
const NIGERIAN_PREFIXES = [
    "080",
    "081",
    "090",
    "091",
    "070",
    "071",
    "0902",
    "0901",
    "0903",
    "0904",
    "0905",
    "0906",
    "0907",
    "0908",
    "0909",
    "0810",
    "0811",
    "0812",
    "0813",
    "0814",
    "0815",
    "0816",
    "0817",
    "0818",
    "0819",
];
const nigerianPhoneNumber = zod_1.z.string().refine((phone) => {
    const cleaned = phone.replace(/[\s-]/g, "");
    return (NIGERIAN_PREFIXES.some((prefix) => cleaned.startsWith(prefix)) &&
        (cleaned.length === 11 || cleaned.length === 13));
}, {
    message: "Invalid Nigerian phone number format",
});
exports.signUpSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    firstName: zod_1.z.string().min(2, "First name must be at least 2 characters"),
    lastName: zod_1.z.string().min(2, "Last name must be at least 2 characters"),
    phoneNumber: nigerianPhoneNumber,
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
exports.verifyOtpSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    otp: zod_1.z.string().length(6, "OTP must be 6 digits"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(1, "Password is required"),
});
exports.resendOTPSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
});
exports.resetPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    newPassword: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
exports.linkDeviceSchema = zod_1.z.object({
    powerBoxId: zod_1.z.string().min(1, "PowerBox ID is required"),
});
