import { Request, Response } from 'express';

import { AuthService } from './auth.service';

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register(req.body);
      return res.status(201).json({
        message: 'Register success',
        user: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body);
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async logout(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      const userId = req.user?.id;

      if (!token) {
        return res.status(400).json({
          message: 'Invalid Token',
        });
      }

      await AuthService.logout(token, userId!);
      return res.status(200).json({
        message: 'Logout Successfully',
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
  async forgetPassword(req: Request, res: Response) {
    try {
      const result = await AuthService.forgotPassword(req.body.email);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;
      const result = await AuthService.resetPassword(token, newPassword);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
};
