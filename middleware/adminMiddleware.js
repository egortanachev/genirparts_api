import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function adminMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).send('Access Denied');
    }
    
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, 'your_jwt_secret');
        req.user = await User.findById(verified.userId);
        if (!req.user) {
            return res.status(401).send('Access Denied');
        }
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}