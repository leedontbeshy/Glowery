import { Request, Response, NextFunction } from "express";

import { handleControllerError } from "@/common/utils/controllerHelper";

import { AdminService } from "./admin.service";


export const AdminController = {
    async getAllUser(req: Request, res: Response) {
        try {
            const result = await AdminService.getAllUser(req.query);
            res.status(200).json({
                message: "Fetched users successfully",
                result
            })
        } catch (error: any) {
            return handleControllerError(error, res, 'getAllUser');
        }

    }
}
