//Gộp các route từ tất cả feature
import { Router } from 'express';

import authRoutes from './auth/auth.route';
import adminRoutes from './admin/admin.route'
import userRoutes from './users/user.route';
import productRoutes from './products/product.route';




const router = Router();

router.use('/auth', authRoutes);
//router.use("/users", userRoutes);

router.use('/user', userRoutes);

router.use('/admin', adminRoutes)

router.use('/product', productRoutes)
export default router;
