import { Request, Response } from "express";

import { UserService } from "./user.service";


export const UserController = {
    async getUserInfo(req: Request, res: Response){
        try {
            const userId = Number(req.params.id)
            const result = await UserService.getUserInfo(userId);
            return res.status(200).json({
                success: true,
                result
            });
        } catch (error: any) {
            return res.status(400).json({
            error: error.message,
        });
        }
    }
}