import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';

class CartsController {
    static async addToCart(req, res) {
        try {
            const { userId, productId, quantity } = req.body;
            let cart = await Cart.findOne({ userId });

            if (!cart) {
                cart = new Cart({ userId });
                await cart.save();
            }

            let cartItem = await CartItem.findOne({ cartId: cart._id, productId });

            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                cartItem = new CartItem({ cartId: cart._id, productId, quantity });
            }

            await cartItem.save();
            res.status(201).send(cartItem);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    static async removeFromCart(req, res) {
        try {
            const { cartItemId } = req.params;
            const cartItem = await CartItem.findByIdAndDelete(cartItemId);

            if (!cartItem) {
                return res.status(404).send({ error: 'CartItem not found' });
            }

            res.send(cartItem);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    static async removeAllFromCart(req, res) {
        try {
            const { userId } = req.params;
            const cart = await Cart.findOne({ userId });

            if (!cart) {
                return res.status(404).send({ error: 'Cart not found' });
            }

            await CartItem.deleteMany({ cartId: cart._id });
            res.send({ message: 'All items removed from cart' });
        } catch (error) {
            res.status(400).send(error);
        }
    }

    static async getCart(req, res) {
        try {
            const { userId } = req.params;
            const cart = await Cart.findOne({ userId });

            if (!cart) {
                return res.status(404).send({ error: 'Cart not found' });
            }

            const cartItems = await CartItem.find({ cartId: cart._id }).populate('productId');
            res.send(cartItems);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    static async updateCartItem(req, res) {
        try {
            const { cartItemId, quantity } = req.body;
            const cartItem = await CartItem.findById(cartItemId);

            if (!cartItem) {
                return res.status(404).send({ error: 'CartItem not found' });
            }

            cartItem.quantity = quantity;
            await cartItem.save();
            res.status(200).send(cartItem);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
}

export default CartsController;