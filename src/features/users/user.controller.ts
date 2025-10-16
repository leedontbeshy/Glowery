import { Request, Response } from 'express';

import { UserService } from './user.service';

export const UserController = {
    async getUserInfo(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const result = await UserService.getUserInfo(userId);
            return res.status(200).json({
                success: true,
                result,
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message,
            });
        }
    },
    async updateUserInfo(req: Request, res: Response): Promise<any> {
        try {
            const userId = Number(req.params.id);
            const result = await UserService.updateUserInfo(userId, req.body);

            return res.status(200).json({
                success: true,
                result,
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },

    async updatePassword(req: Request, res: Response):Promise<any>{
        try {
            const result = await UserService.updatePassword(Number(req.params.id),req.body);
            return res.status(200).json({
                success: true,
                result,
            })

        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
};
