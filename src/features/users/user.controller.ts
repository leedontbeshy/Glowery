import { Request, Response } from 'express';

import { handleControllerError } from '@/common/utils/controllerHelper';

import { UserService } from './user.service';



export const UserController = {
    async getUserInfo(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized',
                });
            }

            const user = await UserService.getUserInfo(userId);
            
            return res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error: any) {
            return handleControllerError(error, res, 'getUserInfo');
        }
    },

    async updateUserInfo(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized',
                });
            }

            const user = await UserService.updateUserInfo(userId, req.body);
            
            return res.status(200).json({
                success: true,
                data: user,
                message: 'User updated successfully',
            });
        } catch (error: any) {
            return handleControllerError(error, res, 'updateUserInfo');
        }
    },

    async updatePassword(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized',
                });
            }

            await UserService.updatePassword(userId, req.body);
            
            return res.status(200).json({
                success: true,
                message:'Password updated successfully',
            });
        } catch (error: any) {
            return handleControllerError(error, res, 'updatePassword');
        }
    }
}