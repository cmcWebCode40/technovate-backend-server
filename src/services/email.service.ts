import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

export class EmailService {
readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT ?? '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendOtpEmail(email: string, _firstName: string, otp: string): Promise<void> {
    try {
    //   const mailOptions = {
    //     from: `"Power Box" <${process.env.SMTP_FROM || 'noreply@powerbox.com'}>`,
    //     to: email,
    //     subject: 'Verify Your Power Box Account',
    //     html: `
    //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //         <h2 style="color: #333;">Welcome to Power Box, ${firstName}!</h2>
    //         <p style="color: #666; font-size: 16px;">
    //           Thank you for signing up. Please use the OTP below to verify your account:
    //         </p>
    //         <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
    //           <h1 style="color: #4CAF50; font-size: 36px; letter-spacing: 5px; margin: 0;">${otp}</h1>
    //         </div>
    //         <p style="color: #666; font-size: 14px;">
    //           This OTP will expire in 10 minutes. If you didn't create an account with Power Box, 
    //           please ignore this email.
    //         </p>
    //         <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    //         <p style="color: #999; font-size: 12px; text-align: center;">
    //           © 2025 Power Box. All rights reserved.
    //         </p>
    //       </div>
    //     `,
    //   };

      // Commented out for testing - uncomment when SMTP is configured
      // await this.transporter.sendMail(mailOptions);
      
      logger.info(`OTP email would be sent to ${email} with OTP: ${otp}`);
    } catch (error) {
      logger.error('Failed to send OTP email:', error);
      throw new Error('Failed to send OTP email');
    }
  }
}