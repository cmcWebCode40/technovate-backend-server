import { z } from "zod";

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

const nigerianPhoneNumber = z.string().refine(
  (phone) => {
    const cleaned = phone.replace(/[\s-]/g, "");

    return (
      NIGERIAN_PREFIXES.some((prefix) => cleaned.startsWith(prefix)) &&
      (cleaned.length === 11 || cleaned.length === 13)
    );
  },
  {
    message: "Invalid Nigerian phone number format",
  }
);

export const signUpSchema = z.object({
  email: z.string().email("Invalid email format"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: nigerianPhoneNumber,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email format"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const resendOTPSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export const linkDeviceSchema = z.object({
  powerBoxId: z.string().min(1, "PowerBox ID is required"),
});

export type LinkDeviceDto = z.infer<typeof linkDeviceSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type ResendOTPDto = z.infer<typeof resendOTPSchema>;
export type SignUpDto = z.infer<typeof signUpSchema>;
export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;
