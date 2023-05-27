import { NextFunction, Request, Response } from 'express';
import { UserJwtPayload } from '../data/interfaces/user.interfaces';
import authService from '../services/authentication.service';

declare module 'express' {
    interface Request {
        user?: UserJwtPayload;
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decoded = authService.verify(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Verify error:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

export default verifyToken;
