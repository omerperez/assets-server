import { NextFunction, Request, Response } from "express";
import authService from "../services/authentication.service";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { mobile, password } = req.body;
        const token = await authService.login(mobile, password);
        return res.status(200).send({ token })
    } catch (error) {
        res.status(error.code).send();
        next(error);
    }
}

const verify = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.body;
        const decoded = authService.verify(token);
        return res.status(200).send(decoded)
    } catch (error) {
        res.sendStatus(403);
        next(error);
    }
}

const authController = {
    login, verify
}

export default authController;