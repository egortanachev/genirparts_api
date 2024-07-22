import express from 'express';
import CartsController from '../controllers/CartsController.js';

const router = express.Router();

router.post('/add', CartsController.addToCart);
router.delete('/remove/:cartItemId', CartsController.removeFromCart);
router.delete('/removeAll/:userId', CartsController.removeAllFromCart);
router.get('/:userId', CartsController.getCart);
router.put('/update', CartsController.updateCartItem);

export default router;