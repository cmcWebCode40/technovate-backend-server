import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import {
  linkDeviceSchema,
  loginSchema,
  resendOTPSchema,
  resetPasswordSchema,
  signUpSchema,
  verifyOtpSchema,
} from "../validations/auth.validation";
import { ResponseUtil } from "../utils/response.util";
import { ZodError } from "zod";
import { AuthRequest } from "../middleware/auth.middleware";

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validatedData = signUpSchema.parse(req.body);

      const result = await this.authService.signUp(validatedData);

      res
        .status(201)
        .json(ResponseUtil.success("Account created successfully", result));
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(
          ResponseUtil.error(
            "Validation failed",
            error.errors.map((e) => e.message)
          )
        );
        return;
      }

      if (error instanceof Error) {
        res.status(400).json(ResponseUtil.error(error.message));
        return;
      }

      next(error);
    }
  };

  verifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validatedData = verifyOtpSchema.parse(req.body);

      const user = await this.authService.verifyOtp(
        validatedData.email,
        validatedData.otp
      );

      res
        .status(200)
        .json(ResponseUtil.success("Account verified successfully", { user }));
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(
          ResponseUtil.error(
            "Validation failed",
            error.errors.map((e) => e.message)
          )
        );
        return;
      }

      if (error instanceof Error) {
        res.status(400).json(ResponseUtil.error(error.message));
        return;
      }

      next(error);
    }
  };
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validatedData = loginSchema.parse(req.body);

      const result = await this.authService.login(validatedData);

      res.status(200).json(ResponseUtil.success("Login successful", result));
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(
          ResponseUtil.error(
            "Validation failed",
            error.errors.map((e) => e.message)
          )
        );
        return;
      }

      if (error instanceof Error) {
        res.status(401).json(ResponseUtil.error(error.message));
        return;
      }

      next(error);
    }
  };
  resendOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validatedData = resendOTPSchema.parse(req.body);

      const result = await this.authService.resendOtp(validatedData.email);

      res.status(200).json(ResponseUtil.success("OTP sent successful", result));
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(
          ResponseUtil.error(
            "Validation failed",
            error.errors.map((e) => e.message)
          )
        );
        return;
      }

      if (error instanceof Error) {
        res.status(401).json(ResponseUtil.error(error.message));
        return;
      }

      next(error);
    }
  };

  getUser = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(401).json(ResponseUtil.error("Unauthorized"));
        return;
      }

      const user = await this.authService.getUserById(req.userId);

      res
        .status(200)
        .json(
          ResponseUtil.success("User details fetched successfully", { user })
        );
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json(ResponseUtil.error(error.message));
        return;
      }

      next(error);
    }
  };

  deleteAccount = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(401).json(ResponseUtil.error("Unauthorized"));
        return;
      }

      await this.authService.deleteAccount(req.userId);

      res
        .status(200)
        .json(ResponseUtil.success("Account deleted successfully"));
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json(ResponseUtil.error(error.message));
        return;
      }

      next(error);
    }
  };

  resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validatedData = resetPasswordSchema.parse(req.body);

      await this.authService.resetPassword(
        validatedData.email,
        validatedData.newPassword
      );

      res.status(200).json(ResponseUtil.success("Password reset successfully"));
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(
          ResponseUtil.error(
            "Validation failed",
            error.errors.map((e) => e.message)
          )
        );
        return;
      }

      if (error instanceof Error) {
        res.status(400).json(ResponseUtil.error(error.message));
        return;
      }

      next(error);
    }
  };
  linkDevice = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(401).json(ResponseUtil.error("Unauthorized"));
        return;
      }

      const validatedData = linkDeviceSchema.parse(req.body);

      const result = await this.authService.linkDevice(
        req.userId,
        validatedData.powerBoxId
      );

      res
        .status(200)
        .json(ResponseUtil.success("Device linked successfully", result));
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(
          ResponseUtil.error(
            "Validation failed",
            error.errors.map((e) => e.message)
          )
        );
        return;
      }

      if (error instanceof Error) {
        res.status(400).json(ResponseUtil.error(error.message));
        return;
      }

      next(error);
    }
  };
}
