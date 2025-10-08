import { AuthService } from "./auth.service";
import { Request, Response } from "express";

export const AuthController = {
    async register(req: Request, res: Response){
        try {
            const result = await AuthService.register(req.body);
            return res.status(201).json({
                message: "Register success",
                user: result
            })
        } catch (error: any) {
            return res.status(400).json({
              error: error.message,
            });
        };
    },

    async login(req: Request, res: Response){
        try {
            const result = await AuthService.login(req.body);
            return res.status(200).json({ result });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}