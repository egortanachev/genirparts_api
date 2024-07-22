import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function authMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Authentication required' });
    }

    try {
        const verified = jwt.verify(token, 'your_jwt_secret');
        req.user = await User.findById(verified.userId);
        if (!req.user) {
            return res.status(401).send({ error: 'User not found' });
        }
        req.userId = req.user._id;
        next();
    } catch (err) {
        res.status(400).send({ error: 'Invalid token' });
    }
}