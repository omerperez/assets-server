import { NextFunction, Request, Response } from "express";
import authService from "../services/authentication.service";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { mobile, password } = req.body;
        const { user, token } = await authService.login(mobile, password);
        return res.cookie('token', token, { httpOnly: true, secure: true }).json({ user, token });
    } catch (error) {
        next(error);
    }
}

const verify = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.body;
        const decoded = authService.verify(token);
        return res.status(200).send(decoded)
    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
}

const authController = {
    login, verify
}

export default authController;