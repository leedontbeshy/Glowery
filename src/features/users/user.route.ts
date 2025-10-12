import { Router } from "express";

import { UserController } from "./user.controller";

const router = Router();

router.get('/:id', UserController.getUserInfo);

export default router;