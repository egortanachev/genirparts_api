import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Cart from '../models/Cart.js';

class AuthController {
    static async register(req, res) {
        try {
            const { email, password, phone, role, firstName, lastName } = req.body;
            const login = email.split('@')[0];
            const user = new User({ email, password, phone, role, login });
            await user.save();

            const profile = new Profile({ userId: user._id, firstName, lastName });
            await profile.save();

            const cart = new Cart({ userId: user._id });
            await cart.save();

            const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
            const userId = user._id;
            res.status(201).send({ token, userId });
        } catch (error) {
            res.status(400).send(error);
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user || !(await user.comparePassword(password))) {
                throw new Error('Invalid email credentials');
            }
            const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
            const userId = user._id;
            res.send({ token, userId });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    static async getUserInfo(req, res) {
        try {
            const userId = req.userId;

            const user = await User.findById(userId).select('-password');
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }

            const profile = await Profile.findOne({ userId: user._id });
            if (!profile) {
                return res.status(404).send({ error: 'Profile not found' });
            }

            res.send({ user, profile });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

export default AuthController;