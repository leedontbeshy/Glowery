import { Request, Response } from 'express';

import { handleControllerError } from '@/common/utils/controllerHelper';

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
            return handleControllerError(error, res, 'register')
        }
    },

    async login(req: Request, res: Response) {
        try {
            const result = await AuthService.login(req.body);
            return res.status(200).json({ result });
        } catch (error: any) {
            return handleControllerError(error, res, 'login')
        }
    },

    async logout(req: Request, res: Response) {
        try {
            const accessToken = req.headers.authorization?.replace('Bearer ', '');
            const { refreshToken } = req.body;
            const userId = req.user?.id;

            if (!accessToken || !refreshToken) {
                return res.status(400).json({
                    message: 'Missing Access Token or Refresh Token',
                });
            }

            await AuthService.logout(accessToken,refreshToken, userId!);
            return res.status(200).json({
                message: 'Logout Successfully',
            });
        } catch (error: any) {
            return handleControllerError(error, res, 'logout')
        }
    },

    async forgetPassword(req: Request, res: Response) {
        try {
            const result = await AuthService.forgotPassword(req.body.email);
            return res.status(200).json(result);
        } catch (error: any) {
            return handleControllerError(error, res, 'forgetPassword')
        }
    },

    async resetPassword(req: Request, res: Response) {
        try {
            const { token, newPassword } = req.body;
            const result = await AuthService.resetPassword(token, newPassword);
            return res.status(200).json(result);
        } catch (error: any) {
            return handleControllerError(error, res, 'resetPassword')
        }
    },
};
