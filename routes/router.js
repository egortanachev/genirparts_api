import express from 'express';
import authRouter from './authRouter.js';
import productRouter from './productRouter.js';
import manufacturerRouter from './manufacturerRouter.js';
import categoryRouter from './categoryRouter.js';
import profileRouter from './profileRouter.js';
import cartRouter from './cartRouter.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/manufacturers', manufacturerRouter);
router.use('/categories', categoryRouter);
router.use('/profiles', profileRouter);
router.use('/carts', cartRouter);

export default router;