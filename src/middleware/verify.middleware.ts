import { NextFunction, Request, Response } from 'express';
import { IUserSchema } from '../data/interfaces/user.interfaces';
import authService from '../services/authentication.service';
import userService from '../services/user.service';

declare module 'express' {
    interface Request {
        user?: IUserSchema;
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decoded = authService.verify(token);
        const user = await userService.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Verify error:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

export default verifyToken;
