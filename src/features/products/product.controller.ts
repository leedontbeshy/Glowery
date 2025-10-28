import { Request, Response } from "express";

import { handleControllerError } from "@/common/utils/controllerHelper";
import { sendError, sendSuccess } from "@/common/utils/response";

import { ProductService } from "./product.service";


export const ProductController = {
    async getAllProduct(req: Request, res: Response) {
        try {
            const result = await ProductService.getAllProduct(req.query);
                res.status(200).json({
                message: "Fetched products successfully",
                result
            })
        } catch (error) {
            return handleControllerError(error, res, 'getAllProducts');
        }
    },

    async getProductById(req: Request, res: Response){
        try {
            const idParam = req.params.id;
            const id = Number(idParam);

            if(!idParam || isNaN(id)){
                return sendError(res, null, "Invalid or missing product ID", 400)
            }

            const result = await ProductService.getProductDetailById(id);
            return sendSuccess(res, result, "Product fetched successfully")
        } catch (error) {   
            return handleControllerError(error, res, 'getProductDetailById')
        }
    }
}